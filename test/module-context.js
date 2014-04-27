var test = require('tape')
var self = this

test('module export maintains context', function(t) {
  t.equal(self, exports)
  t.end()
})

test('module maintains __filename', function(t) {
  t.ok(/test\/module\-context\.js$/.test(__filename))
  t.end()
})
