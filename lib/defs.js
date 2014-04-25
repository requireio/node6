var harmonyParse = require("esprima-fb").parse
var Defs = require('defs')

module.exports = defs

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
