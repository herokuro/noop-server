'use strict'

const test = require('tape')
const path = require('path')
const execa = require('execa')
const getPort = require('get-port')

const pkg = require('../package.json')
const cli = path.resolve(__dirname, '../bin/cli.js')
const NoopServer = require('../lib')

test('CLI basic flags', async t => {
  const { stdout: versionShort } = await execa.command(`node ${cli} -v`)

  t.equal(versionShort, pkg.version,
    `$ noop-server -v should return ${pkg.version}`)

  const { stdout: versionLong } = await execa.command(`node ${cli} --version`)

  t.equal(versionLong, pkg.version,
    `$ noop-server --version should return ${pkg.version}`)

  const { stdout: helpShort } = await execa.command(`node ${cli} -h`)
  const helpShortIndices = [
    helpShort.indexOf('Usage:'),
    helpShort.indexOf('$ noop-server'),
    helpShort.indexOf('Options:'),
    helpShort.indexOf('Examples:')
  ]

  t.deepEqual(helpShortIndices, [1, 10, 80, 209],
    '$ noop-server -h should return the help text')

  const { stdout: helpLong } = await execa.command(`node ${cli} --help`)
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

test('CLI defaults', async t => {
  try {
    await execa.command(`node ${cli}`, { timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, 'Server listening on port: 8080',
      '$ noop-server should start with default options')
  }

  t.end()
})

test('CLI port option', async t => {
  let port

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} ${port}`, { timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server ${port} should start with custom port ${port}`)
  }

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} -p ${port}`, { timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server -p ${port} should start with custom port ${port}`)
  }

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} --port ${port}`, { timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port}`,
      `$ noop-server --port ${port} should start with custom port ${port}`)
  }

  t.end()
})

test('CLI message option', async t => {
  const message = '"My custom message."'

  try {
    await execa.command(`node ${cli} -m ${message}`, { shell: true, timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout.slice(-41), `with custom message: ${message}`,
      `$ noop-server -m ${message} should start with a custom message ${message}`)
  }

  try {
    await execa.command(`node ${cli} --message ${message}`, { shell: true, timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout.slice(-41), `with custom message: ${message}`,
      `$ noop-server --message ${message} should start with a custom message ${message}`)
  }

  t.end()
})

test('CLI port-message pair options', async t => {
  const message = '"msg"'

  let port

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} ${port} ${message}`, { shell: true, timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server ${port} ${message} should start with custom port ${port} and message ${message}`)
  }

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} -p ${port} -m ${message}`, { shell: true, timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server -p ${port} -m ${message} should start with custom port ${port} and message ${message}`)
  }

  try {
    port = await getPort({ port: NoopServer.DEFAULT_PORT })
    await execa.command(`node ${cli} --port ${port} --message ${message}`, { shell: true, timeout: 2500 })
  } catch (error) {
    t.equal(error.stdout, `Server listening on port: ${port} with custom message: ${message}`,
      `$ noop-server --port ${port} --message ${message} should start with custom port ${port} and message ${message}`)
  }

  t.end()
})
