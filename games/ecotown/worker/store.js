// CodeStore: one SQLite-backed Durable Object holding every batch, code and session.
// Because every request goes through this single object, "one active session per code" is exact.
import { DurableObject } from 'cloudflare:workers';
import { createStore } from './codes.js';

export class CodeStore extends DurableObject {
  constructor(ctx, env) { super(ctx, env); this.s = createStore(ctx.storage); }
  // RPC: call(method, ...args) from the Worker
  async call(method, ...args) {
    const allowed = ['createBatch', 'addCodes', 'updateBatch', 'deleteBatch', 'updateCode', 'listBatches', 'listCodes', 'login', 'check', 'logout'];
    if (!allowed.includes(method)) throw new Error('bad method');
    return this.s[method](...args);
  }
}
