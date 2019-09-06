'use strict'

const _ = require('../utils')

_.test('cli:help flag', async t => {
  const helpFile = await _.readFile(_.path.helpText)
  const trimmedHelpFile = helpFile.slice(0, -1)

  const { stdout: helpShort } = await _.run(`node ${_.cli} -h`)

  t.deepEqual(helpShort, trimmedHelpFile,
    '$ noop-server -h should return the help text')

  const { stdout: helpLong } = await _.run(`node ${_.cli} --help`)

  t.deepEqual(helpLong, trimmedHelpFile,
    '$ noop-server --help should return the help text')

  t.end()
})
