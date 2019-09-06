'use strict'

const http = require('http')

const path = require('./_internal/path')
const text = require('./_internal/text')
const readFile = require('./_internal/readFile')
const redirectToRoot = require('./_internal/redirectToRoot')

/**
 * The noop-server class.
 */
class NoopServer {
  /**
   * @param {number} [port]    - A nice port.
   * @param {string} [message] - A nice message.
   */
  constructor (port = NoopServer.DEFAULT_PORT, message = NoopServer.DEFAULT_MESSAGE) {
    if (port === null) {
      port = NoopServer.DEFAULT_PORT
    }

    if (message === null) {
      message = NoopServer.DEFAULT_MESSAGE
    }

    // check port validity
    if (port < 0 || port > 65535) {
      throw new Error(text.format(text.error.invalidPortNumber, { port }))
    }

    // check message validity
    if (message.length === 0) {
      throw new Error(text.format(text.error.invalidMessage, { message }))
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
              readFile(response, path.html, 'text/html', (error, data) => {
                if (error) return text.format(text.error.missingHtml, { error })
                return text.format(data.toString(), { message: this._message })
              })
              break

            case '/favicon.ico':
              console.log('serve favicon')
              readFile(response, path.favicon, 'image/x-icon', (error, data) => {
                if (error) return text.format(text.error.missingFile, { error })
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

  /**
   * @returns {number}
   */
  get port () {
    return this._port
  }

  /**
   * @returns {string}
   */
  get message () {
    return this._message
  }

  /**
   * Starts the noop-server.
   */
  start () {
    this._server.listen(this._port)

    if (this._message === NoopServer.DEFAULT_MESSAGE) {
      console.log(`Server listening on port: ${this._port}`)
    } else {
      console.log(`Server listening on port: ${this._port} with custom message: "${this._message}"`)
    }
  }

  /**
   * Stops the noop-server.
   *
   * @async
   *
   * @returns {Promise}
   */
  async stop () {
    return new Promise((resolve, reject) => {
      this._server.close(error => {
        /* istanbul ignore next */
        if (error) reject(error)

        console.log('Stopped listening.')
        resolve(null)
      })
    })
  }
}

/**
 * The default port number.
 *
 * @const {number}
 * @default
 */
NoopServer.DEFAULT_PORT = 8080

/**
 * The default message.
 *
 * @const {string}
 * @default
 */
NoopServer.DEFAULT_MESSAGE = 'Hello there from noop-server!'

module.exports = NoopServer
