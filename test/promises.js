var test = require('tape')

function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

test('promises', function(t) {
  t.plan(1)
  timeout(100).then(function() {
    t.ok(true)
    t.end()
  })
})
