'use strict'

const _ = require('../utils')

_.test('cli:message option', async t => {
  const message = '"My custom message."'

  try {
    await _.run(`node ${_.cli} -m ${message}`, { shell: true, timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout.slice(-41), `with custom message: ${message}`,
      `$ noop-server -m ${message} should start with a custom message ${message}`)
  }

  try {
    await _.run(`node ${_.cli} --message ${message}`, { shell: true, timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout.slice(-41), `with custom message: ${message}`,
      `$ noop-server --message ${message} should start with a custom message ${message}`)
  }

  t.end()
})
