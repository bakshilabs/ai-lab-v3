// Every browser module must at least parse (catches broken edits before a play-through does).
import test from 'node:test'; import assert from 'node:assert/strict'; import { execFileSync } from 'node:child_process'; import fs from 'node:fs'; import path from 'node:path';
const root = new URL('../js/', import.meta.url).pathname; const files = [];
(function walk(d) { for (const f of fs.readdirSync(d)) { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f.endsWith('.js')) files.push(p); } })(root);
for (const f of files) test(`parses: ${path.relative(root, f)}`, () => { assert.doesNotThrow(() => execFileSync(process.execPath, ['--experimental-default-type=module', '--check', f], { stdio: 'pipe' })); });
