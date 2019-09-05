'use strict'

const fs = require('fs')

module.exports = (response, filePath, mimeType, handler) => {
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
