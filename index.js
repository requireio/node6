"use strict"


var ModuleMap = require('module-map')
var transpile = require('./transpile')
var Defs = require('defs')
var esNext = require('esnext')
var harmonyParse = require("esprima-fb").parse
var Destructuring = require('es6-destructuring-jstransform');


module.exports = function(dir) {
  var map = ModuleMap(dir)
  map(destructuring)
  map(defs)
  map(esnext)
}

function esnext(content, filename) {
  var e = esNext.compile(content, {
    includeRuntime: true
  })
  return e.code
}

function defs(content, filename, options) {
  var d = Defs(content, {
    "environments": ["node"],
    "loopClosures": "iife",
    "disallowVars": false,
    "disallowDuplicated": false,
    "disallowUnknownReferences": false,
    parse: harmonyParse
  })
  return d.src
}

function destructuring(content) {
  var d = Destructuring(content)
  return d.code
}
