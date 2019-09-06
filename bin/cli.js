#!/usr/bin/env node

/* eslint no-fallthrough: "off" */

const fs = require('fs')
const text = require('../lib/_internal/text')

// process flags and options ---------------------------------------------------
const { version, homepage } = require('../package.json')
const [,, ...args] = process.argv

let port = null
let message = null

for (let i = 0, len = args.length; i < len; i += 2) {
  const flag = args[i]
  const value = args[i + 1]

  switch (flag) {
    // process version flag
    case '-v':
    case '--version':
      console.log(version)
      process.exit()

    // process help flag
    case '-h':
    case '--help':
      console.log(
        text.format(
          fs.readFileSync(`${__dirname}/help.tpl`).toString().slice(0, -1),
          { homepage }
        )
      )
      process.exit()

    // process port option
    case '-p':
    case '--port':
      port = parseInt(value, 10)
      break

    // process message option
    case '-m':
    case '--message':
      message = value
      break

    // process port-message pair options
    default:
      /* istanbul ignore next */
      if (typeof flag === 'string') port = parseInt(flag, 10)

      /* istanbul ignore next */
      if (typeof value === 'string') message = value
      break
  }
}

const Server = require('../lib')

new Server(port, message).start()
