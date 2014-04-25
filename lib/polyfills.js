var mapPath = JSON.stringify(require.resolve('es6-map'))
var setPath = JSON.stringify(require.resolve('es6-set'))
var promisePath = JSON.stringify(require.resolve('es6-promise'))

module.exports = polyfills

function polyfills(content) {
  return [
      'var Map = require('+mapPath+')'
    , 'var Set = require('+setPath+')'
    , 'var Promise = require('+promisePath+').Promise'
    , ';(function() {'
    , content
    , '})();'
  ].join('\n')
}
