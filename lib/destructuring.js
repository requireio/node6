var Destructuring = require('es6-destructuring-jstransform')

module.exports = destructuring

function destructuring(content) {
  var d = Destructuring(content)
  return d.code
}
