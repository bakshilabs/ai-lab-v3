// Passcodes: batches, dates, newest-login-wins sessions, revocation, rate limiting.
import test from 'node:test'; import assert from 'node:assert/strict';
import { createStore, normalise, batchState, MAX_FAILS } from '../../worker/codes.js';

function memStorage() {
  const m = new Map(); const clone = (v) => (v === undefined ? v : structuredClone(v));
  return { async get(k) { return clone(m.get(k)); }, async put(k, v) { m.set(k, clone(v)); }, async delete(k) { m.delete(k); },
    async list({ prefix = '' } = {}) { return new Map([...m].filter(([k]) => k.startsWith(prefix)).map(([k, v]) => [k, clone(v)])); } };
}
const T = (d) => Date.parse(d + 'T12:00:00Z');

test('batch creation makes unique, well-formed codes', async () => {
  const s = createStore(memStorage());
  const { batch, codes } = await s.createBatch({ school: 'Oak Primary', starts: '2026-11-01', ends: '2026-12-20', count: 200 });
  assert.equal(codes.length, 200); assert.equal(new Set(codes).size, 200);
  for (const c of codes) assert.match(c, /^[A-Z]+-\d{4}$/);
  assert.equal((await s.listCodes(batch.id)).length, 200);
  await assert.rejects(s.createBatch({ school: 'X', starts: '2026-12-01', ends: '2026-11-01', count: 5 }), /before/);
  await assert.rejects(s.createBatch({ school: 'X', starts: '2026-12-01', ends: '2026-12-02', count: 0 }), /1–500/);
});

test('login works only inside the batch dates (end date inclusive, UTC)', async () => {
  const s = createStore(memStorage());
  const { codes: [code] } = await s.createBatch({ school: 'Oak', starts: '2026-11-01', ends: '2026-11-30', count: 1 });
  assert.equal((await s.login(code, 'ip', T('2026-10-31'))).reason, 'not_started');
  assert.ok((await s.login(code, 'ip', T('2026-11-01'))).ok);
  assert.ok((await s.login(code.toLowerCase().replace('-', ' '), 'ip', Date.parse('2026-11-30T23:59:00Z'))).ok, 'case/spacing insensitive, last day counts');
  assert.equal((await s.login(code, 'ip', Date.parse('2026-12-01T00:00:00Z'))).reason, 'expired');
  assert.equal(normalise(' otter 1234 '), 'OTTER-1234');
  assert.equal(batchState({ starts: '2026-01-01', ends: '2026-01-01', revoked: false }, Date.parse('2026-01-01T23:00:00Z')), 'active');
});

test('newest login wins: the earlier device is told it was replaced', async () => {
  const s = createStore(memStorage()); const now = T('2026-11-10');
  const { codes: [code] } = await s.createBatch({ school: 'Oak', starts: '2026-11-01', ends: '2026-11-30', count: 1 });
  const a = await s.login(code, 'ip1', now); assert.ok((await s.check(a.session, now)).ok);
  const b = await s.login(code, 'ip2', now + 1000);
  assert.equal((await s.check(a.session, now + 2000)).reason, 'replaced');
  assert.ok((await s.check(b.session, now + 2000)).ok);
  await s.logout(b.session); assert.equal((await s.check(b.session, now + 3000)).reason, 'replaced');
});

test('sessions end when the batch expires or a code/batch is revoked', async () => {
  const s = createStore(memStorage()); const now = T('2026-11-10');
  const { batch, codes: [c1, c2] } = await s.createBatch({ school: 'Oak', starts: '2026-11-01', ends: '2026-11-30', count: 2 });
  const a = await s.login(c1, 'ip', now); const b = await s.login(c2, 'ip', now);
  assert.equal((await s.check(a.session, T('2026-12-02'))).reason, 'expired');
  await s.updateCode(c1, { revoked: true }); assert.equal((await s.check(a.session, now)).reason, 'revoked');
  assert.equal((await s.login(c1, 'ip', now)).reason, 'revoked');
  await s.updateBatch(batch.id, { revoked: true }); assert.equal((await s.check(b.session, now)).reason, 'revoked');
  await s.updateBatch(batch.id, { revoked: false, ends: '2026-12-31' }); assert.ok((await s.login(c2, 'ip', T('2026-12-15'))).ok, 'extended dates');
});

test('wrong guesses are rate limited per IP; real codes still work from other IPs', async () => {
  const s = createStore(memStorage()); const now = T('2026-11-10');
  const { codes: [code] } = await s.createBatch({ school: 'Oak', starts: '2026-11-01', ends: '2026-11-30', count: 1 });
  for (let i = 0; i < MAX_FAILS; i++) assert.equal((await s.login('NOPE-0000', 'bad', now)).reason, 'unknown');
  assert.equal((await s.login(code, 'bad', now)).reason, 'too_many');
  assert.ok((await s.login(code, 'good', now)).ok);
  assert.ok((await s.login(code, 'bad', now + 11 * 60 * 1000)).ok, 'limit resets after the window');
});

test('admin listing counts used and active codes; deleting a batch removes its codes', async () => {
  const s = createStore(memStorage()); const now = T('2026-11-10');
  const { batch, codes } = await s.createBatch({ school: 'Oak', starts: '2026-11-01', ends: '2026-11-30', count: 3 });
  await s.login(codes[0], 'ip', now);
  const [row] = await s.listBatches(now); assert.equal(row.codes, 3); assert.equal(row.used, 1); assert.equal(row.active, 1); assert.equal(row.state, 'active');
  assert.ok(!('session' in (await s.listCodes(batch.id, now))[0]), 'session ids are never exposed to admin');
  await s.deleteBatch(batch.id); assert.equal((await s.listBatches(now)).length, 0);
});
