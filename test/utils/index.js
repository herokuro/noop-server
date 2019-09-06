'use strict'

const fs = require('fs')
const path = require('path')
const test = require('tape')
const execa = require('execa')
const getPort = require('get-port')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

const NoopServer = require('../../lib')
const root = path.join(__dirname, '../../')
const bin = path.join(root, '/bin')

module.exports = {
  test,
  NoopServer,
  fetch,
  JSDOM,
  run: execa.command,
  readFile: async path =>
    new Promise((resolve, reject) => {
      fs.readFile(path, 'utf-8', (error, data) => {
        if (error) reject(error)
        resolve(data)
      })
    }),
  port: async () => getPort({ port: NoopServer.DEFAULT_PORT }),
  cli: path.resolve(__dirname, '../../bin/cli.js'),
  package: require('../../package.json'),
  timeout: 1750, // in milliseconds
  path: {
    root,
    bin,
    helpText: path.join(bin, '/help.txt')
  }
}
