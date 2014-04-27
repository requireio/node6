var test = require('tape')

test('Set', function(t) {
  var s = new Set();
  s.add("hello");
  s.add("goodbye");
  s.add("hello");
  t.equal(s.size, 2)
  t.ok(s.has('hello'))
  t.ok(s.has('goodbye'))
  t.end()
})

test('Map', function(t) {
  var s = new Set();
  var m = new Map();
  m.set("hello", 42);
  m.set(s, 34);
  t.equal(m.get(s), 34)
  t.end()
})
