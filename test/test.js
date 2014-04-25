"use strict"

var test = require('tape')
var node6 = require('../')(__dirname)

test('blocks', function(t) {
  t.equal(require('./blocks'), 20)
  t.end()
})

test('generators', function(t) {
  t.deepEqual(require('./generators'), [0, 3, 6, 9, 12, 15, 18])
  t.end()
})

test('destructuring', function(t) {
  t.equal(require('./destructuring')({y: 3}), 3)
  t.end()
})

test('templates', function(t) {
  t.equal(require('./templates'), 'hello world')
  t.end()
})

test('promises', function(t) {
  var timeout = require('./promises')
  timeout(100).then(function() {
    t.end()
  })
})


test('collections', function(t) {
  var c = require('./collections')
  t.ok(c.set.has('hello'))
  t.equal(c.map.get(c.set), 34)
  t.end()
  //t.equal(c.weakMap.size, undefined)
  //t.equal(c.weakMap.size, 1)
  //t.ok(c.weakMap.has(c.set))
})
