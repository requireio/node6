var test = require('tape')
var self = this

test('module export maintains context', function(t) {
  t.equal(self, exports)
  t.end()
})
