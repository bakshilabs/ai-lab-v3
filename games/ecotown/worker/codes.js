// Passcode logic, independent of Cloudflare so it can be unit-tested in Node.
// storage: { get(key), put(key, value), delete(key), list({ prefix }) -> Map } (Durable Object storage API).
// Keys: b:<batchId> -> batch, c:<CODE> -> code record, rl:<ip> -> rate-limit record.

export const WORDS = ('OTTER MAPLE RIVER CEDAR FERN MEADOW HERON ACORN BADGER BEACON BIRCH BRAMBLE BREEZE BROOK CANYON CLOVER COMET CORAL CRANE '
  + 'DAISY DELTA DUNE EAGLE EMBER FALCON FINCH FJORD FLINT FOREST FOX GARDEN GLACIER GROVE HARBOR HAZEL HEDGE HILL HONEY IRIS ISLAND IVY '
  + 'JADE KESTREL KITE LAGOON LARCH LARK LAUREL LEAF LILAC LILY LINDEN LOTUS LYNX MAGPIE MARSH MESA MINNOW MOSS NECTAR NEWT OAK OASIS '
  + 'OCEAN ORCHID OSPREY OWL PEBBLE PELICAN PINE PLUM POND POPPY PRAIRIE PUFFIN QUAIL RAVEN REED ROBIN ROWAN SAGE SALMON SPARROW SPRUCE '
  + 'STREAM SUNBEAM SWALLOW SWAN TERN THISTLE THRUSH TIDE TULIP VALLEY VIOLET WALNUT WAVE WHEAT WILLOW WREN ZEPHYR BEAVER BISON CARDINAL '
  + 'CHERRY COBALT CRICKET DOLPHIN DRAGONFLY ELK GECKO HEATHER JUNIPER KOALA LEMUR MANGO MARIGOLD MOOSE NUTMEG ORCA PANDA PEACH PENGUIN '
  + 'PEONY QUARTZ RAIN SEAL SPROUT STARLING SUMMIT SUNFLOWER TIGER TOPAZ TORTOISE TUNDRA WALRUS WHALE YARROW ZEBRA').split(' ');
const DAY = 86400000;
export const MAX_FAILS = 10, FAIL_WINDOW = 10 * 60 * 1000, SESSION_IDLE = 3 * 60 * 1000;

export const normalise = (s) => String(s || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^([A-Z]+)(\d+)$/, '$1-$2');
const dayStart = (d) => Date.parse(d + 'T00:00:00Z');
const randInt = (n) => { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; };
const randId = (n = 24) => { const b = new Uint8Array(n); crypto.getRandomValues(b); return [...b].map((x) => x.toString(16).padStart(2, '0')).join(''); };
const isDate = (d) => /^\d{4}-\d{2}-\d{2}$/.test(d) && !Number.isNaN(dayStart(d));

export function newCode(taken) {
  for (let i = 0; i < 50; i++) { const c = `${WORDS[randInt(WORDS.length)]}-${String(1000 + randInt(9000))}`; if (!taken.has(c)) return c; }
  throw new Error('could not generate a unique code');
}

// whether a batch is live at time `now`: starts at 00:00 UTC on `starts`, ends at the end of `ends` (UTC)
export function batchState(b, now) {
  if (!b || b.revoked) return 'revoked';
  if (now < dayStart(b.starts)) return 'not_started';
  if (now >= dayStart(b.ends) + DAY) return 'expired';
  return 'active';
}

export function createStore(storage) {
  const allCodes = async () => [...(await storage.list({ prefix: 'c:' })).values()];
  const api = {
    // ---------------- admin
    async createBatch({ school, note = '', starts, ends, count }, now = Date.now()) {
      count = Math.floor(Number(count));
      if (!school || !String(school).trim()) throw new Error('School or teacher name is required');
      if (!isDate(starts) || !isDate(ends)) throw new Error('Dates must be YYYY-MM-DD');
      if (dayStart(ends) < dayStart(starts)) throw new Error('End date is before start date');
      if (!(count >= 1 && count <= 500)) throw new Error('Number of codes must be 1–500');
      const id = randId(6); const batch = { id, school: String(school).trim().slice(0, 120), note: String(note).slice(0, 300), starts, ends, created: now, revoked: false };
      await storage.put('b:' + id, batch);
      const taken = new Set((await allCodes()).map((c) => c.code)); const codes = [];
      for (let i = 0; i < count; i++) { const code = newCode(taken); taken.add(code); const rec = { code, batch: id, revoked: false, session: null, seen: 0, lastLogin: 0, logins: 0 }; await storage.put('c:' + code, rec); codes.push(code); }
      return { batch, codes };
    },
    async addCodes(id, count) {
      const b = await storage.get('b:' + id); if (!b) throw new Error('No such batch'); count = Math.floor(Number(count)); if (!(count >= 1 && count <= 500)) throw new Error('Number of codes must be 1–500');
      const taken = new Set((await allCodes()).map((c) => c.code)); const codes = [];
      for (let i = 0; i < count; i++) { const code = newCode(taken); taken.add(code); await storage.put('c:' + code, { code, batch: id, revoked: false, session: null, seen: 0, lastLogin: 0, logins: 0 }); codes.push(code); }
      return codes;
    },
    async updateBatch(id, patch) {
      const b = await storage.get('b:' + id); if (!b) throw new Error('No such batch');
      if (patch.starts !== undefined) { if (!isDate(patch.starts)) throw new Error('Bad start date'); b.starts = patch.starts; }
      if (patch.ends !== undefined) { if (!isDate(patch.ends)) throw new Error('Bad end date'); b.ends = patch.ends; }
      if (dayStart(b.ends) < dayStart(b.starts)) throw new Error('End date is before start date');
      if (patch.revoked !== undefined) b.revoked = !!patch.revoked;
      if (patch.school !== undefined) b.school = String(patch.school).slice(0, 120);
      if (patch.note !== undefined) b.note = String(patch.note).slice(0, 300);
      await storage.put('b:' + id, b); return b;
    },
    async deleteBatch(id) {
      for (const c of await allCodes()) if (c.batch === id) await storage.delete('c:' + c.code);
      await storage.delete('b:' + id);
    },
    async updateCode(code, patch) {
      const c = await storage.get('c:' + normalise(code)); if (!c) throw new Error('No such code');
      if (patch.revoked !== undefined) { c.revoked = !!patch.revoked; if (c.revoked) c.session = null; }
      if (patch.endSession) c.session = null;
      await storage.put('c:' + c.code, c); return c;
    },
    async listBatches(now = Date.now()) {
      const batches = [...(await storage.list({ prefix: 'b:' })).values()]; const codes = await allCodes();
      return batches.sort((a, b) => b.created - a.created).map((b) => {
        const mine = codes.filter((c) => c.batch === b.id);
        return { ...b, state: batchState(b, now), codes: mine.length, used: mine.filter((c) => c.logins > 0).length, active: mine.filter((c) => c.session && now - c.seen < SESSION_IDLE).length };
      });
    },
    async listCodes(id, now = Date.now()) {
      return (await allCodes()).filter((c) => c.batch === id).sort((a, b) => a.code.localeCompare(b.code))
        .map(({ session, ...c }) => ({ ...c, activeNow: !!session && now - c.seen < SESSION_IDLE }));
    },

    // ---------------- students
    // returns { ok, session, code, ends } or { ok:false, reason }
    async login(rawCode, ip = 'unknown', now = Date.now()) {
      const rk = 'rl:' + ip; const rl = (await storage.get(rk)) || { n: 0, t: now };
      if (now - rl.t > FAIL_WINDOW) { rl.n = 0; rl.t = now; }
      if (rl.n >= MAX_FAILS) return { ok: false, reason: 'too_many' };
      const fail = async (reason) => { rl.n++; await storage.put(rk, rl); return { ok: false, reason }; };
      const code = normalise(rawCode); const c = code && (await storage.get('c:' + code));
      if (!c) return fail('unknown');
      if (c.revoked) return fail('revoked');
      const b = await storage.get('b:' + c.batch); const st = batchState(b, now);
      if (st !== 'active') return { ok: false, reason: st };      // a real code: don't count as a guess
      c.session = randId(); c.seen = now; c.lastLogin = now; c.logins++;   // newest login wins: replaces any earlier session
      await storage.put('c:' + code, c);
      return { ok: true, session: `${code}.${c.session}`, code, ends: b.ends };
    },
    // checks a session token: { ok, code } or { ok:false, reason: 'none'|'replaced'|'expired'|'revoked' }
    async check(token, now = Date.now(), { touch = true } = {}) {
      const [code, sid] = String(token || '').split('.'); if (!code || !sid) return { ok: false, reason: 'none' };
      const c = await storage.get('c:' + code); if (!c) return { ok: false, reason: 'none' };
      if (c.revoked) return { ok: false, reason: 'revoked' };
      const st = batchState(await storage.get('b:' + c.batch), now); if (st !== 'active') return { ok: false, reason: st === 'revoked' ? 'revoked' : 'expired' };
      if (c.session !== sid) return { ok: false, reason: 'replaced' };
      if (touch && now - c.seen > 30000) { c.seen = now; await storage.put('c:' + code, c); }
      return { ok: true, code };
    },
    async logout(token) {
      const [code, sid] = String(token || '').split('.'); const c = code && (await storage.get('c:' + code));
      if (c && c.session === sid) { c.session = null; await storage.put('c:' + code, c); }
    },
  };
  return api;
}
