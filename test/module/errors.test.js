'use strict'

/* eslint no-new: "off" */

const _ = require('../utils')

_.test('module:errors', async t => {
  try {
    new _.NoopServer(-1)
  } catch (error) {
    t.equal(error.message, 'Port must be an integer between 0-65535, got: -1.',
      'Should return an error, when port number is out of bounds (lower).')
  }

  try {
    new _.NoopServer(65536)
  } catch (error) {
    t.equal(error.message, 'Port must be an integer between 0-65535, got: 65536.',
      'Should return an error, when port number is out of bounds (higher).')
  }

  try {
    new _.NoopServer(null, '')
  } catch (error) {
    t.equal(error.message, 'Message must be a non-empty string, got: "".',
      'Should return an error, when message is an empty string.')
  }

  const port = await _.port()
  const path = require('../../lib/_internal/path')

  let oldPath
  let server, response, html

  // temporarily change HTML path to a non-existent one
  oldPath = path.html
  path.html = 'non-existent.html'

  server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  response = await _.fetch(`http://localhost:${port}`)
  html = await response.text()

  t.equal(html, "Error getting the HTML file: Error: ENOENT: no such file or directory, open 'non-existent.html'.",
    'Should return an HTML file not found error, when the HTML file path is invalid.')

  await server.stop()
  // change back HTML path
  path.html = oldPath
  console.log('<--------------------------------------------------------------')

  // temporarily change favicon path to a non-existent one
  oldPath = path.favicon
  path.favicon = 'non-existent.ico'

  server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  response = await _.fetch(`http://localhost:${port}/favicon.ico`)
  html = await response.text()

  t.equal(html, "Error getting the file: Error: ENOENT: no such file or directory, open 'non-existent.ico'.",
    'Should return a file not found error, when the favicon file path is invalid.')

  await server.stop()
  // change back favicon path
  path.favicon = oldPath
  console.log('<--------------------------------------------------------------')

  t.end()
})
