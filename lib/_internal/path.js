'use strict'

const path = require('path')

const PUBLIC = path.resolve(__dirname, '../public')

module.exports = {
  html: `${PUBLIC}/index.html`,
  favicon: `${PUBLIC}/favicon.ico`
}
