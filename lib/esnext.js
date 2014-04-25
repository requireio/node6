var esNext = require('esnext')

module.exports = esnext

function esnext(content, filename) {
  var e = esNext.compile(content, {
    includeRuntime: true
  })
  return e.code
}
