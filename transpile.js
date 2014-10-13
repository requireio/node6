"use strict"

var compile = require('traceur').compile;
var defaults = require('defaults')
var traceurOptions = {
  modules: 'commonjs',
  blockBinding: true
}

module.exports = function transpile(src, options) {
  var compiled = compile(src, defaults(options, traceurOptions))
  return compiled
}
