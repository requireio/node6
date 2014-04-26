var test = require('tape')

test('string.prototype', function(t) {
  t.ok("abcde".contains("cd"))
  t.equal("abc".repeat(3), "abcabcabc")
  t.ok("abcd".startsWith("abc"))
  t.ok("abcd".endsWith("cd"))
  t.ok("abcd".contains("bc"))
  t.end()
})
