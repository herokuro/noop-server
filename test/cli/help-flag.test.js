'use strict'

const _ = require('../utils')

_.test('cli:help flag', async t => {
  const { stdout: helpShort } = await _.run(`node ${_.cli} -h`)
  const helpShortIndices = [
    helpShort.indexOf('Usage:'),
    helpShort.indexOf('$ noop-server'),
    helpShort.indexOf('Options:'),
    helpShort.indexOf('Examples:')
  ]

  t.deepEqual(helpShortIndices, [1, 10, 80, 209],
    '$ noop-server -h should return the help text')

  const { stdout: helpLong } = await _.run(`node ${_.cli} --help`)
  const helpLongIndices = [
    helpLong.indexOf('Usage:'),
    helpLong.indexOf('$ noop-server'),
    helpLong.indexOf('Options:'),
    helpLong.indexOf('Examples:')
  ]

  t.deepEqual(helpLongIndices, [1, 10, 80, 209],
    '$ noop-server --help should return the help text')

  t.end()
})
