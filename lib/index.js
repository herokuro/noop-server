'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

const DEFAULT_PORT = 8080
const DEFAULT_MESSAGE = 'Hello there from noop-server!'
const PUBLIC = path.join(__dirname, 'public')

function redirectToRoot (response) {
  response.writeHead(302, { Location: '/' })
  response.end('redirect to root')
}

function readFile (response, filePath, type) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.statusCode = 500
      response.end(`Error getting the file: ${error}.`)
    } else {
      response.setHeader('Content-type', type)
      response.end(data)
    }
  })
}

module.exports = function (port = DEFAULT_PORT, message = DEFAULT_MESSAGE) {
  if (port === null) {
    port = DEFAULT_PORT
  }

  if (message === null) {
    message = DEFAULT_MESSAGE
  }

  // check port validity
  if (port < 0 || port > 65535) {
    throw new Error(`Port must be an integer between 0-65535, got: ${port}.`)
  }

  // check message validity
  if (message.length === 0) {
    throw new Error(`Message must be a non-empty string, got: "${message}".`)
  }

  http
    .createServer((request, response) => {
      console.log(`"${request.method}" "${request.url}"`)

      switch (request.method) {
        case 'GET':
          switch (request.url) {
            case '/':
              console.log('serve index.html')
              fs.readFile(`${PUBLIC}/index.html`, (error, data) => {
                if (error) {
                  response.statusCode = 500
                  response.end(`Error getting the HTML file: ${error}.`)
                } else {
                  response.setHeader('Content-type', 'text/html')
                  response.end(data.toString().replace('{{ message }}', message))
                }
              })
              break

            case '/favicon.ico':
              console.log('serve favicon')
              readFile(response, `${PUBLIC}/favicon.ico`, 'image/x-icon')
              break

            case '/api':
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ message }))
              break

            default:
              console.log('redirect to root')
              redirectToRoot(response)
              break
          }
          break

        default:
          console.log('redirect to root')
          redirectToRoot(response)
          break
      }
    })
    .listen(port)

  console.log(`Server listening on port: ${port}`)
}
