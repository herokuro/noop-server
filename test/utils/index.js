'use strict'

const path = require('path')
const test = require('tape')
const execa = require('execa')
const getPort = require('get-port')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

const NoopServer = require('../../lib')

module.exports = {
  test,
  NoopServer,
  fetch,
  JSDOM,
  run: execa.command,
  port: async () => getPort({ port: NoopServer.DEFAULT_PORT }),
  cli: path.resolve(__dirname, '../../bin/cli.js'),
  package: require('../../package.json'),
  timeout: 2500 // in milliseconds
}
