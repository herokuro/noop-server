'use strict'

const _ = require('../utils')

_.test('module:defaults', async t => {
  const server = new _.NoopServer()

  t.equal(_.NoopServer.DEFAULT_PORT, 8080,
    'NoopServer.DEFAULT_PORT should be equal to 8080')

  t.equal(_.NoopServer.DEFAULT_MESSAGE, 'Hello there from noop-server!',
    'NoopServer.DEFAULT_MESSAGE should be equal to "Hello there from noop-server!"')

  t.equal(server.port, _.NoopServer.DEFAULT_PORT,
    'The default .port getter should return 8080')

  t.equal(server.message, _.NoopServer.DEFAULT_MESSAGE,
    'The default .message getter should return "Hello there from noop-server!"')

  t.end()
})
