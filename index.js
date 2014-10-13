"use strict"

var traceur = require('traceur')
var traceurRequire = require('traceur/src/node/require')

var path = require('path')

module.exports = function(dir) {
  require('es6-shim')
  traceurRequire.makeDefault(function(filename) {
    return shouldCompile(dir, filename)
  }, {
    modules: 'commonjs',
    blockBinding: true
  })
}

function shouldCompile(directory, filename) {
  if (!directory) return true
  // ignore if node_modules is anywhere in the path between requirer
  // and requiree
  return !(
    /node_modules\//.test(path.relative(filename, directory)) ||
    /node_modules\//.test(path.relative(directory, filename))
  )
}
