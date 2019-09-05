'use strict'

const _ = require('../utils')

_.test('module:serve HTML with default message', async t => {
  const port = await _.port()
  const server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await _.fetch(`http://localhost:${port}`)
  const html = await response.text()
  const dom = new _.JSDOM(html)
  const document = dom.window.document

  t.equal(document.title, 'noop-server | @herokuro',
    'The HTML\'s title should be "noop-server | @herokuro"')

  t.equal(document.body.querySelector('.message__title').textContent, _.NoopServer.DEFAULT_MESSAGE,
    `The HTML's default message should be equal to "${_.NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
