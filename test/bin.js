var test = require('tape')

var exec = require('child_process').exec
var node6Bin = require.resolve('../bin/node6')
var bl = require('bl')
var fs = require('fs')

test('-e works', function(t) {
  exec([node6Bin, '-e', '"let start = 2; console.log(JSON.stringify(process.argv.slice(start)));"', 'a', 'b', 'c'].join(' '), {cwd: __dirname}, function(err, stdout, stderr) {
    console.log(stderr)
    t.ifError(err)
    var data = JSON.parse(stdout)
    t.deepEqual(data.slice(2), ['a', 'b', 'c'])
    t.end()
  })
})

test('-p works', function(t) {
  exec([node6Bin, '-p', '"let start = 2; JSON.stringify(process.argv.slice(start));"', 'a', 'b', 'c'].join(' '), {cwd: __dirname}, function(err, stdout, stderr) {
    t.ifError(err)
    var data = JSON.parse(stdout)
    t.deepEqual(data.slice(2), ['a', 'b', 'c'])
    t.end()
  })
})

test('maintains node6 as execPath', function(t) {
  exec([node6Bin, '-p "process.execPath"'].join(' '), {cwd: __dirname}, function(err, stdout, stderr) {
    t.ifError(err)
    t.equal(stdout.trim(), node6Bin)
    t.end()
  })
})

test('tests', function(t) {
  var tests = fs.readdirSync(__dirname).filter(function(name) {
    return /\.js$/.test(name) &&
      name !== 'index.js' &&
      name !== 'bin.js'
  })
  t.plan(tests.length * 2)
  tests.forEach(function(testFile) {
    t.ok(testFile, testFile)
    exec([node6Bin, testFile].join(' '), {cwd: __dirname}, function(err, stdout, stderr) {
      t.ifError(err, 'no error in ' + testFile)
    })
  })
})
