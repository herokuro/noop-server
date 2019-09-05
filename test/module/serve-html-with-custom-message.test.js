'use strict'

const _ = require('../utils')

_.test('module:serve HTML with custom message', async t => {
  const port = await _.port()
  const message = 'A custom message!'
  const server = new _.NoopServer(port, message)

  console.log('-------------------------------------------------------------->')
  server.start()

  const response = await _.fetch(`http://localhost:${port}`)
  const html = await response.text()
  const dom = new _.JSDOM(html)
  const document = dom.window.document

  t.equal(document.body.querySelector('.message__title').textContent, message,
    `The HTML's message should be equal to the custom message "${message}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
