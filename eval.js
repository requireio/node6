var Promise = require('es6-promise')
var Map = require('es6-map')
var Set = require('es6-set')
var vm = require('vm')

var destructuring = require('./lib/destructuring')
var polyfills = require('./lib/polyfills')
var esnext = require('./lib/esnext')
var defs = require('./lib/defs')

module.exports = eval

function eval(src, context, filename, callback) {
  context.Map = Map
  context.Set = Set
  context.Promise = Promise

  var result = vm.runInNewContext(transpile(src)
    , context
    , filename
  )

  callback(null, result)
}

function transpile(src, filename) {
  src = '{' + src.slice(1, -1) + '}'
  src = destructuring(src, filename)
  src = defs(src, filename)
  src = esnext(src, filename)

  return src
}
