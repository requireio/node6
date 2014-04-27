var test = require('tape')

test('arrow functions', function(t) {
  t.deepEqual([1,2,3].map(a => a * 2), [2,4,6])
  t.end()
})
