'use strict'

const _ = require('../utils')

_.test('cli:version flag', async t => {
  const { stdout: versionShort } = await _.run(`node ${_.cli} -v`)

  t.equal(versionShort, _.package.version,
    `$ noop-server -v should return ${_.package.version}`)

  const { stdout: versionLong } = await _.run(`node ${_.cli} --version`)

  t.equal(versionLong, _.package.version,
    `$ noop-server --version should return ${_.package.version}`)

  t.end()
})
