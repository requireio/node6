/**
 * A lot of this entry file is based off of node's src/node.js.
 */

// grab a reference to the entry point script, then clean up the env
var entryPoint = process.env.NODE6_ENTRY_POINT;
delete process.env.NODE6_ENTRY_POINT;
var Repl = require('./repl')
var transpile = require('./').transpile

// load the custom `.js` ES6 Generator compiler
var node6 = require('./')

// overwrite process.execPath and process.argv[0] with the
// absolute path to the gnode binary
process.execPath = process.argv[0] = require('path').resolve(__dirname, 'bin', 'node6');
// remove "wrap.js" from `process.argv`
process.argv.splice(1, 1);

if (process._eval != null) {
  // User passed '-e' or '--eval' arguments to Node.
  evalScript('[eval]');
} else if (entryPoint) {
  // replace `process.argv[1]` with the expected path value,
  // and re-run Module.runMain()
  process.argv.splice(1, 0, require('path').resolve(entryPoint));
  node6(entryPoint)
  require('module').runMain();
} else {
  console.error('node6 repl currently unsupported. Sorry!\nNote -e and -p flags work though.')
  process.exit(1)
  // run the REPL, or run from stdin

  // If -i or --interactive were passed, or stdin is a TTY.
  if (process._forceRepl || require('tty').isatty(0)) {
    var opts = {}
    if (parseInt(process.env.NODE_NO_READLINE, 10)) {
      opts.terminal = false;
    }
    if (parseInt(process.env.NODE_DISABLE_COLORS, 10)) {
      opts.useColors = false;
    }
    var repl = Repl(opts);
    repl.on('exit', function() {
      process.exit();
    });

  } else {
    // Read all of stdin - execute it.
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    var code = '';
    process.stdin.on('data', function(d) {
      code += d;
    });

    process.stdin.on('end', function() {
      process._eval = code;
      evalScript('[stdin]');
    });
  }
}

// copied (almost) directly from joyent/node's src/node.js
function evalScript (name) {
  var Module = require('module');
  var path = require('path');
  var cwd = process.cwd();

  var module = new Module(name);
  module.filename = path.join(cwd, name);
  module.paths = Module._nodeModulePaths(cwd);
  var script = process._eval;

  // transpile js
  script = transpile(script)

  if (!Module._contextLoad) {
    var body = script;
    script = 'global.__filename = ' + JSON.stringify(name) + ';\n' +
             'global.exports = exports;\n' +
             'global.module = module;\n' +
             'global.__dirname = __dirname;\n' +
             'global.require = require;\n' +
             'return require("vm").runInThisContext(' +
             JSON.stringify(body) + ', ' +
             JSON.stringify(name) + ', true);\n';
  }

  var result = module._compile(script, name + '-wrapper');
  if (process._print_eval) console.log(result);
  return result
}
