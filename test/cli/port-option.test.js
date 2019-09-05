'use strict'

const _ = require('../utils')

_.test('cli:port option', async t => {
  let port

  try {
    port = await _.port()
    await _.run(`node ${_.cli} ${port}`, { timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server ${port} should start with custom port ${port}`)
  }

  try {
    port = await _.port()
    await _.run(`node ${_.cli} -p ${port}`, { timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server -p ${port} should start with custom port ${port}`)
  }

  try {
    port = await _.port()
    await _.run(`node ${_.cli} --port ${port}`, { timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server --port ${port} should start with custom port ${port}`)
  }

  t.end()
})
