var test = require('tape')

test('math', function(t) {
  t.equal(Math.sign(-10), -1)
  t.equal(Math.sign(10), 1)
  t.end()
})
