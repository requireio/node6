"use strict"

var ModuleMap = require('module-map')
var transpile = require('./transpile')

module.exports = function mapTranspile(dir) {
  return ModuleMap(dir)(transpile)
}

module.exports.transpile = transpile
