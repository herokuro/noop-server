'use strict'

module.exports = response => {
  response.writeHead(302, { Location: '/' })
  response.end('redirect to root')
}
