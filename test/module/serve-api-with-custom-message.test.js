'use strict'

const _ = require('../utils')

_.test('module:serve API with custom message', async t => {
  const port = await _.port()
  const message = 'Another custom message!'
  const server = new _.NoopServer(port, message)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await _.fetch(`http://localhost:${port}/api`)
  const json = await response.json()

  t.equal(json.message, message,
    `The JSON's message should be equal to the custom message "${message}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
