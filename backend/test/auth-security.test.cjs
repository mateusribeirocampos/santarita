const { test, after, mock } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const express = require('express');
const jwt = require('jsonwebtoken');
const { once } = require('node:events');
process.env.JWT_SECRET = 'isolated-security-tests-only-not-a-production-secret';
let currentUser = { id: '00000000-0000-4000-8000-000000000001', role: 'ADMIN', isActive: true, name: 'Test', email: 'test@example.test' };
let lookups = 0, creations = 0;
const originalLoad = Module._load;
Module._load = function(id, ...rest) {
  if (id === '@prisma/client') return { PrismaClient: class {
    user = {
      async findUnique({ where }) { lookups++; return where.id ? currentUser : undefined; },
      async create({ data }) { creations++; const { password, ...safe } = data; return { ...safe, id: '00000000-0000-4000-8000-000000000002' }; }
    };
  } };
  return originalLoad.call(this, id, ...rest);
};
const router = require('../dist/routes/auth.js').default;
Module._load = originalLoad;
const app = express(); app.use(express.json()); app.use('/auth', router);
const server = app.listen(0, '127.0.0.1');
after(async () => { server.closeAllConnections(); await new Promise(resolve => server.close(resolve)); });
const token = (options = {}) => jwt.sign({ userId: '00000000-0000-4000-8000-000000000001' }, process.env.JWT_SECRET, { expiresIn: '1h', ...options });
async function request(path, value, body = {}) {
  if (!server.listening) await once(server, 'listening');
  return fetch(`http://127.0.0.1:${server.address().port}/auth${path}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json', ...(value ? { Authorization: `Bearer ${value}` } : {}) }, body: JSON.stringify(body)
  });
}

test('registration and renewal require current authorization', async t => {
  await t.test('anonymous registration fails before DB lookup', async () => {
    assert.equal((await request('/register')).status, 401); assert.equal(creations, 0); assert.equal(lookups, 0);
  });
  await t.test('ordinary account cannot create administrators', async () => {
    currentUser.role = 'EDITOR'; assert.equal((await request('/register', token(), { role: 'ADMIN' })).status, 403); assert.equal(creations, 0);
  });
  await t.test('administrator can register an editor', async () => {
    currentUser.role = 'ADMIN';
    assert.equal((await request('/register', token(), { name: 'Test editor', email: 'editor@example.test', password: 'test-password-123', role: 'EDITOR' })).status, 201);
    assert.equal(creations, 1);
  });
  await t.test('expired refresh is rejected before DB lookup', async () => {
    const before = lookups; assert.equal((await request('/refresh', token({ expiresIn: -1 }))).status, 401); assert.equal(lookups, before);
  });
  await t.test('valid refresh succeeds', async () => assert.equal((await request('/refresh', token())).status, 200));
  await t.test('disabled account cannot renew', async () => {
    currentUser = undefined; assert.equal((await request('/refresh', token())).status, 401);
  });
  await t.test('other signing algorithms fail', async () => assert.equal((await request('/verify', token({ algorithm: 'HS384' }))).status, 401));
  await t.test('authorization header is never logged', async () => {
    const value = token(); const log = mock.method(console, 'log', () => {});
    await request('/verify', value);
    assert.equal(log.mock.calls.some(c => c.arguments.some(a => typeof a === 'string' && a.includes(value))), false);
    log.mock.restore();
  });
});
