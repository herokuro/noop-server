'use strict'

const _ = require('../utils')

_.test('module:serve API with default message', async t => {
  const port = await _.port()
  const server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await _.fetch(`http://localhost:${port}/api`)
  const json = await response.json()

  t.equal(json.message, _.NoopServer.DEFAULT_MESSAGE,
    `The JSON's default message should be equal to "${_.NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
