#!/usr/bin/env node

/* eslint no-fallthrough: "off" */

// process flags and options ---------------------------------------------------
const pkg = require('../package.json')
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
      console.log(pkg.version)
      process.exit()

    // process help flag
    case '-h':
    case '--help':
      console.log(`
        Usage:
          $ noop-server
          $ noop-server port message
          $ noop-server [options]

        Options:
          -p, --port      The port to use to run the server.
          -m, --message   The greeting text message to use by the server.

        Examples:
          $ noop-server
            Starting server on...

          $ noop-server 8080

          $ noop-server 8888 "My custom message."

          $ noop-server -p 8080

          $ noop-server -m "My custom message."

          $ noop-server -p 8080 -m "My custom message."

        Documentation can be found at ${pkg.homepage}

        `.replace(/^ {8}/gm, '').slice(0, -2) // dedent and end-trim the text
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
