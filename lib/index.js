'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

const PUBLIC = path.join(__dirname, 'public')

function redirectToRoot (response) {
  response.writeHead(302, { Location: '/' })
  response.end('redirect to root')
}

function readFile (response, filePath, mimeType, handler) {
  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.statusCode = 500
      response.end(handler(error))
    } else {
      response.setHeader('Content-type', mimeType)
      response.end(handler(null, data))
    }
  })
}

class NoopServer {
  constructor (port = NoopServer.DEFAULT_PORT, message = NoopServer.DEFAULT_MESSAGE) {
    if (port === null) {
      port = NoopServer.DEFAULT_PORT
    }

    if (message === null) {
      message = NoopServer.DEFAULT_MESSAGE
    }

    // check port validity
    if (port < 0 || port > 65535) {
      throw new Error(`Port must be an integer between 0-65535, got: ${port}.`)
    }

    // check message validity
    if (message.length === 0) {
      throw new Error(`Message must be a non-empty string, got: "${message}".`)
    }

    this._port = port
    this._message = message
    this._server = http.createServer((request, response) => {
      console.log(`"${request.method}" "${request.url}"`)

      switch (request.method) {
        case 'GET':
          switch (request.url) {
            case '/':
              console.log('serve index.html')
              readFile(response, `${PUBLIC}/index.html`, 'text/html', (error, data) => {
                if (error) return `Error getting the HTML file: ${error}.`
                return data.toString().replace('{{ message }}', this._message)
              })
              break

            case '/favicon.ico':
              console.log('serve favicon')
              readFile(response, `${PUBLIC}/favicon.ico`, 'image/x-icon', (error, data) => {
                if (error) return `Error getting the file: ${error}.`
                return data
              })
              break

            case '/api':
              response.setHeader('Content-Type', 'application/json')
              response.end(JSON.stringify({ message: this._message }))
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
  }

  get port () {
    return this._port
  }

  get message () {
    return this._message
  }

  start () {
    this._server.listen(this._port)

    if (this._message === NoopServer.DEFAULT_MESSAGE) {
      console.log(`Server listening on port: ${this._port}`)
    } else {
      console.log(`Server listening on port: ${this._port} with custom message: "${this._message}"`)
    }
  }

  async stop () {
    return new Promise((resolve, reject) => {
      this._server.close(error => {
        if (error) {
          reject(error)
        }

        console.log('Stopped listening.')
        resolve()
      })
    })
  }
}

NoopServer.DEFAULT_PORT = 8080
NoopServer.DEFAULT_MESSAGE = 'Hello there from noop-server!'

module.exports = NoopServer
