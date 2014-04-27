"use strict"

var destructuring = require('./lib/destructuring')
var polyfills = require('./lib/polyfills')
var esnext = require('./lib/esnext')
var defs = require('./lib/defs')

module.exports = transpile

function transpile(src) {
  src = polyfills(src)
  src = destructuring(src)
  src = defs(src)
  src = esnext(src)
  return src
}
