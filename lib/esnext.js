var esNext = require('esnext')

module.exports = esnext

function esnext(content) {
  var e = esNext.compile(content, {
    includeRuntime: 'function' != typeof wrapGenerator
  })
  return e.code
}
