'use strict'

module.exports = {
  error: {
    invalidPortNumber: 'Port must be an integer between 0-65535, got: {{ port }}.',
    invalidMessage: 'Message must be a non-empty string, got: "{{ message }}".',
    missingFile: 'Error getting the file: {{ error }}.',
    missingHtml: 'Error getting the HTML file: {{ error }}.'
  },
  format: (text, keyValuePairs) =>
    text.replace(/{{\s*(.*?)\s*}}/g, (placeholder, key) => {
      if (key in keyValuePairs) return keyValuePairs[key]
      return placeholder
    })
}
