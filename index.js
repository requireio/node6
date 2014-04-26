"use strict"

var ModuleMap = require('module-map')

var destructuring = require('./lib/destructuring')
var polyfills = require('./lib/polyfills')
var esnext = require('./lib/esnext')
var defs = require('./lib/defs')

module.exports = function(dir) {
  var map = ModuleMap(dir)
  map(polyfills)
  map(destructuring)
  map(defs)
  map(esnext)
}
