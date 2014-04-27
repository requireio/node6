var test = require('tape')

function x({y}) {
  return y
}

test('destructuring', function(t) {
  t.equal(x({y: 3}), 3)
  t.end()
})
