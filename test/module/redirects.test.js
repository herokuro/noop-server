'use strict'

const _ = require('../utils')

_.test('module:redirects', async t => {
  let response, html, document

  // check against general non-existent route - GET
  const port = await _.port()
  const server = new _.NoopServer(port)

  console.log('-------------------------------------------------------------->')
  server.start()

  response = await _.fetch(`http://localhost:${port}/non-existent-route-1`)
  html = await response.text()
  document = new _.JSDOM(html).window.document

  t.equal(document.title, 'noop-server | @herokuro',
    'After redirection, the HTML\'s title should be "noop-server | @herokuro"')

  t.equal(document.body.querySelector('.message__title').textContent, _.NoopServer.DEFAULT_MESSAGE,
    `After redirection, the HTML's default message should be "${_.NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  // check against general non-existent route - POST
  console.log('-------------------------------------------------------------->')
  server.start()

  response = await _.fetch(`http://localhost:${port}/non-existent-route-2`, { method: 'POST' })
  html = await response.text()
  document = new _.JSDOM(html).window.document

  t.equal(document.title, 'noop-server | @herokuro',
    'After another redirection, the HTML\'s title should be "noop-server | @herokuro"')

  t.equal(document.body.querySelector('.message__title').textContent, _.NoopServer.DEFAULT_MESSAGE,
    `After another redirection, the HTML's default message should be "${_.NoopServer.DEFAULT_MESSAGE}"`)

  await server.stop()
  console.log('<--------------------------------------------------------------')

  t.end()
})
