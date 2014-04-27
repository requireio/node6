var test = require('tape')

test('blocks', function(t) {
  t.plan(3)
  var i = 20
  {
    let i = 10
    t.equal(i, 10)
  }
  {
    let i = 30
    t.equal(i, 30)
  }
  t.equal(i, 20)
})
