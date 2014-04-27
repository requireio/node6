var test = require('tape')

test('string templates', function(t) {
  var name = 'world';
  t.equal(`hello ${name}`, 'hello world')
  t.end()
})
