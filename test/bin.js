var test = require('tape')

var exec = require('child_process').exec
var node6Bin = require.resolve('../bin/node6')
var bl = require('bl')

test('-e works', function(t) {
  exec([node6Bin, '-e', '"let start = 2; console.log(JSON.stringify(process.argv.slice(start)));"', 'a', 'b', 'c'].join(' '), {cwd: __dirname}, function(err, stdout, stderr) {
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
