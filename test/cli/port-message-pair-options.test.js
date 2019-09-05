'use strict'

const _ = require('../utils')

_.test('cli:port-message pair options', async t => {
  const message = '"msg"'

  let port

  try {
    port = await _.port()
    await _.run(`node ${_.cli} ${port} ${message}`, { shell: true, timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server ${port} ${message} should start with custom port ${port} and message ${message}`)
  }

  try {
    port = await _.port()
    await _.run(`node ${_.cli} -p ${port} -m ${message}`, { shell: true, timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server -p ${port} -m ${message} should start with custom port ${port} and message ${message}`)
  }

  try {
    port = await _.port()
    await _.run(`node ${_.cli} --port ${port} --message ${message}`, { shell: true, timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server --port ${port} --message ${message} should start with custom port ${port} and message ${message}`)
  }

  t.end()
})
