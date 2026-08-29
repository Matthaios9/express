'use strict'

const test = require('node:test')
const assert = require('node:assert/strict')
const express = require('../index')

test('creates an app', () => {
  const app = express()
  assert.equal(typeof app, 'function')
  assert.equal(typeof app.get, 'function')
  assert.equal(typeof app.listen, 'function')
})

test('responds to a basic GET request', async () => {
  const app = express()

  app.get('/', (req, res) => {
    res.send('Hello World')
  })

  const server = app.listen(0)
  const { port } = server.address()

  try {
    const res = await fetch(`http://localhost:${port}/`)
    const body = await res.text()

    assert.equal(res.status, 200)
    assert.equal(body, 'Hello World')
  } finally {
    server.close()
  }
})