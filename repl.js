"use strict"

var Repl = require('module').requireRepl()
var Domain = require('domain')
var defaults = require('defaults')

var transpile = require('./transpile')

module.exports = start

function start(opts) {
  var domain = opts.domain || Domain.create()

  var repl = Repl.start(defaults({
    domain: domain,
    useGlobal: true,
    ignoreUndefined: false
  }, opts))

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
    try {
      src = transpile(src, {modules: 'inline'})
    } catch(err) {
      err.name = 'SyntaxError'
      return callback(err, src)
    }
    arguments[0] = src
    return originalEval.apply(this, arguments)
  }
  repl.eval = domain.bind(eval_)
  return repl
}


