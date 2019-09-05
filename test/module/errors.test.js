'use strict'

/* eslint no-new: "off" */

const _ = require('../utils')

_.test('module:errors', async t => {
  try {
    new _.NoopServer(-1)
  } catch (error) {
    t.equal(error.message, 'Port must be an integer between 0-65535, got: -1.',
      'Should return an error, when port number is out of bounds (lower).')
  }

  try {
    new _.NoopServer(65536)
  } catch (error) {
    t.equal(error.message, 'Port must be an integer between 0-65535, got: 65536.',
      'Should return an error, when port number is out of bounds (higher).')
  }

  try {
    new _.NoopServer(null, '')
  } catch (error) {
    t.equal(error.message, 'Message must be a non-empty string, got: "".',
      'Should return an error, when message is an empty string.')
  }

  t.end()
})
