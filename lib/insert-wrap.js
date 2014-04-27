"use strict"

module.exports = function insertWrap(args) {
  var scriptName
  args.forEach(function(arg) {
    if (scriptName) return
    if (arg[0] === '-') return
    if (arg === 'debug') isDebug = true, return
    scriptName = arg
  })
  var index = scriptName && args.indexOf(scriptName) || args.length - 1
  var flags = args.slice(0, index)
  var cmdArgs = args.slice(index)
}
