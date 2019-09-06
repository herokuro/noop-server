
Usage:
  $ noop-server
  $ noop-server port message
  $ noop-server [options]

Options:
  -h, --help      Print usage information.
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

Documentation can be found at {{ homepage }}
