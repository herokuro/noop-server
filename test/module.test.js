'use strict'

const test = require('tape')
const getPort = require('get-port')
const fetch = require('node-fetch')
const { JSDOM } = require('jsdom')

const NoopServer = require('../lib')

test('module defaults', t => {
  const server = new NoopServer()

  t.equal(NoopServer.DEFAULT_PORT, 8080,
    'NoopServer.DEFAULT_PORT should be equal to 8080')

  t.equal(NoopServer.DEFAULT_MESSAGE, 'Hello there from noop-server!',
    'NoopServer.DEFAULT_MESSAGE should be equal to "Hello there from noop-server!"')

  t.equal(server.port, NoopServer.DEFAULT_PORT,
    'The default .port getter should return 8080')

  t.equal(server.message, NoopServer.DEFAULT_MESSAGE,
    'The default .message getter should return "Hello there from noop-server!"')

  t.end()
})

test('serve HTML with default message', async t => {
  const port = await getPort({ port: NoopServer.DEFAULT_PORT })
  const server = new NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await fetch(`http://localhost:${port}`)
  const html = await response.text()
  const dom = new JSDOM(html)
  const document = dom.window.document

  t.equal(document.title, 'noop-server | @herokuro',
    'The HTML\'s title should be "noop-server | @herokuro"')

  t.equal(document.body.querySelector('.message__title').textContent, NoopServer.DEFAULT_MESSAGE,
    `The HTML's default message should be equal to "${NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})

test('serve API with default message', async t => {
  const port = await getPort({ port: NoopServer.DEFAULT_PORT })
  const server = new NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await fetch(`http://localhost:${port}/api`)
  const json = await response.json()

  t.equal(json.message, NoopServer.DEFAULT_MESSAGE,
    `The JSON's default message should be equal to "${NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})

test('serve HTML with custom message', async t => {
  const port = await getPort({ port: NoopServer.DEFAULT_PORT })
  const message = 'A custom message!'
  const server = new NoopServer(port, message)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await fetch(`http://localhost:${port}`)
  const html = await response.text()
  const dom = new JSDOM(html)
  const document = dom.window.document

  t.equal(document.body.querySelector('.message__title').textContent, message,
    `The HTML's message should be equal to the custom message "${message}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})

test('serve API with custom message', async t => {
  const port = await getPort({ port: NoopServer.DEFAULT_PORT })
  const message = 'Another custom message!'
  const server = new NoopServer(port, message)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await fetch(`http://localhost:${port}/api`)
  const json = await response.json()

  t.equal(json.message, message,
    `The JSON's message should be equal to the custom message "${message}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
