'use strict'

const _ = require('../utils')

_.test('module:serve favicon', async t => {
  const port = await _.port()
  const server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await _.fetch(`http://localhost:${port}/favicon.ico`)
  const blob = await response.blob()

  t.equal(blob.size, 50198,
    'The favicon.ico should have a size of 50,198 bytes.')

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
