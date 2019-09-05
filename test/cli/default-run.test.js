'use strict'

const _ = require('../utils')

_.test('cli:default run', async t => {
  try {
    await _.run(`node ${_.cli}`, { timeout: _.timeout })
  } catch (error) {
    t.equal(error.stdout.substring(0, 16), 'Server listening',
      '$ noop-server should start with default options')
  }

  t.end()
})
