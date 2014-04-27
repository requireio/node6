"use strict"

var Repl = require('repl')
var Domain = require('domain')

var Promise = require('es6-promise')
var Map = require('es6-map')
var Set = require('es6-set')

var destructuring = require('./lib/destructuring')
var polyfills = require('./lib/polyfills')
var esnext = require('./lib/esnext')
var defs = require('./lib/defs')

module.exports = start

function start() {
  var domain = Domain.create()

  var repl = Repl.start({
    domain: domain
  })

  // use of domain here allows capture of
  // both sync and async errors.
  domain.on('error', function(e) {
    repl.outputStream.write((e.stack || e) + '\n');
    repl.bufferedCommand = '';
    repl.lines.level = [];
    repl.displayPrompt();
  })


  var originalEval = repl.eval

  // before executing original repl eval,
  // compile src and add new globals to context.
  function eval_(src, context, filename, callback) {
    context = addGlobals(context)
    var src = transpile(src)
    var args = [].slice.call(arguments)
    args[0] = src
    return originalEval.apply(this, args)
  }

  repl.eval = domain.bind(eval_)
  return repl
}

function transpile(src, filename) {
  src = '{' + src.slice(1, -1) + '}'
  src = destructuring(src, filename)
  src = defs(src, filename)
  src = esnext(src, filename)

  return src
}

function addGlobals(context) {
  context.Map = context.Map || Map
  context.Set = context.Set || Set
  context.Promise = context.Promise || Promise
  return context
}
