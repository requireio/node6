var test = require('tape')
var self = this
this.test = true

// traceur breaks nodes exports === this for node modules
// due to IIFE wrapper that invokes like:
//}.call(typeof global !== 'undefined' ? global : this);

test.skip('module export maintains context', function(t) {
  t.equal(self, exports)
  t.equal(self, module.exports)
  t.ok(exports.test)
  t.end()
})

test.skip('module maintains __filename', function(t) {
  t.ok(/test\/module\-context\.js$/.test(__filename))
  t.end()
})
