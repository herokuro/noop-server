'use strict'

const http = require('http')
const path = require('path')
const fs = require('fs')

const PORT = process.env.PORT || 8080
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

http
  .createServer((request, response) => {
    console.log(`"${request.method}" "${request.url}"`)

    switch (request.method) {
      case 'GET':
        switch (request.url) {
          case '/':
            console.log('serve index.html')
            readFile(response, `${PUBLIC}/index.html`, 'text/html')
            break

          case '/favicon.ico':
            console.log('serve favicon')
            readFile(response, `${PUBLIC}/favicon.ico`, 'image/x-icon')
            break

          case '/api':
            response.setHeader('Content-Type', 'application/json')
            response.end(JSON.stringify({ message: 'Hello World!' }))
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
  .listen(PORT)

console.log(`Server listening on port: ${PORT}`)
