# noop-server for Heroku

[![GitHub Release][badge-github]][url-github]
[![Travis CI][badge-ci]][url-ci]
[![Coverage Status][badge-coverage]][url-coverage]
[![Greenkeeper][badge-greenkeeper]][url-greenkeeper]
[![Inline Docs][badge-docs-check]][url-docs-check]

[![Code Style Guide][badge-style]][url-style]
[![Commit Style Guide][badge-commit]][url-commit]
[![Release Workflow][badge-release]][url-release]
[![ISC License][badge-license-isc]][url-license-doc]
[![PRs Welcome][badge-contrib]][url-contrib-doc]

---

A really basic Node.js server to use in development and testing, when using Heroku.

---

## Why noop-server?

- **1.:** ...
- **2.:** ...
- **3.:** ...

## Installation

```
npm install @herokuro/noop-server --save
```

## Usage - CLI

- **Run:**
  ```
  $ noop-server
  $ noop-server port message
  $ noop-server [options]
  ```

- **Options:**
  ```
  -h, --help      Print usage information.
  -p, --port      The port to use to run the server.
  -m, --message   The greeting text message to use by the server.
  ```

- **Examples:**
  ```
  $ noop-server
    Starting server on...
    Another line
    
  $ noop-server 8080
    
  $ noop-server 8888 "My custom message."
    
  $ noop-server -p 8080
    
  $ noop-server -m "My custom message."
    
  $ noop-server -p 8080 -m "My custom message."
    x
    
  ```

## Usage - API

<a name="NoopServer"></a>

## NoopServer
The noop-server class.

**Kind**: global class  

* [NoopServer](#NoopServer)
    * [new NoopServer([port], [message])](#new_NoopServer_new)
    * _instance_
        * [.port](#NoopServer+port) ⇒ <code>number</code>
        * [.message](#NoopServer+message) ⇒ <code>string</code>
        * [.start()](#NoopServer+start)
        * [.stop()](#NoopServer+stop) ⇒ <code>Promise</code>
    * _static_
        * [.DEFAULT_PORT](#NoopServer.DEFAULT_PORT) : <code>number</code>
        * [.DEFAULT_MESSAGE](#NoopServer.DEFAULT_MESSAGE) : <code>string</code>

<a name="new_NoopServer_new"></a>

### new NoopServer([port], [message])

| Param | Type | Description |
| --- | --- | --- |
| [port] | <code>number</code> | A nice port. |
| [message] | <code>string</code> | A nice message. |

<a name="NoopServer+port"></a>

### noopServer.port ⇒ <code>number</code>
**Kind**: instance property of [<code>NoopServer</code>](#NoopServer)  
<a name="NoopServer+message"></a>

### noopServer.message ⇒ <code>string</code>
**Kind**: instance property of [<code>NoopServer</code>](#NoopServer)  
<a name="NoopServer+start"></a>

### noopServer.start()
Starts the noop-server.

**Kind**: instance method of [<code>NoopServer</code>](#NoopServer)  
<a name="NoopServer+stop"></a>

### noopServer.stop() ⇒ <code>Promise</code>
Stops the noop-server.

**Kind**: instance method of [<code>NoopServer</code>](#NoopServer)  
<a name="NoopServer.DEFAULT_PORT"></a>

### NoopServer.DEFAULT\_PORT : <code>number</code>
The default port number.

**Kind**: static constant of [<code>NoopServer</code>](#NoopServer)  
**Default**: <code>8080</code>  
<a name="NoopServer.DEFAULT_MESSAGE"></a>

### NoopServer.DEFAULT\_MESSAGE : <code>string</code>
The default message.

**Kind**: static constant of [<code>NoopServer</code>](#NoopServer)  
**Default**: <code>&quot;Hello there from noop-server!&quot;</code>  


## Contribution

**Any contribution is highly appreciated**. To get going, check out the
[**contribution guidelines**][url-contrib-doc]. ***Thank you and have fun!***

## License

[ISC][url-license-doc] @ [Richard King](https://www.richrdkng.com)

  <!--- References ============================================================================ -->

  <!--- Badges -->
  [badge-github]:      https://img.shields.io/github/release/herokuro/noop-server.svg?style=social
  [badge-ci]:          https://img.shields.io/travis/herokuro/noop-server.svg?style=flat-square
  [badge-coverage]:    https://img.shields.io/codecov/c/github/herokuro/noop-server?style=flat-square
  [badge-greenkeeper]: https://badges.greenkeeper.io/herokuro/noop-server.svg?style=flat-square
  [badge-docs-check]:  https://inch-ci.org/github/herokuro/noop-server.svg?branch=master&style=flat-square
  [badge-license-isc]: https://img.shields.io/badge/license-ISC-blue.svg?style=flat-square
  [badge-contrib]:     https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
  [badge-style]:       https://img.shields.io/badge/style-standardjs-f1d300.svg?style=flat-square
  [badge-commit]:      https://img.shields.io/badge/commit-commitizen-fe7d37.svg?style=flat-square
  [badge-release]:     https://img.shields.io/badge/release-semantic--release-e10079.svg?style=flat-square

  <!--- URLs -->
  [url-github]:      https://github.com/herokuro/noop-server
  [url-ci]:          https://travis-ci.org/herokuro/noop-server
  [url-coverage]:    https://codecov.io/gh/herokuro/noop-server
  [url-greenkeeper]: https://greenkeeper.io
  [url-docs-check]:  https://inch-ci.org/github/herokuro/noop-server
  [url-style]:       https://standardjs.com
  [url-commit]:      https://commitizen.github.io/cz-cli
  [url-release]:     https://semantic-release.gitbook.io/semantic-release
  [url-license-doc]: https://github.com/herokuro/noop-server/blob/master/LICENSE.md
  [url-contrib-doc]: https://github.com/herokuro/noop-server/blob/master/.github/CONTRIBUTING.md
