var es6ShimPath = JSON.stringify(require.resolve('es6-shim'))

module.exports = polyfills

function polyfills(content) {
  return [
      "var globals = (typeof global === 'undefined') ? window : global"
    , ';if (!globals.__SHIMMED) require('+es6ShimPath+');'
    , ';globals.__SHIMMED = true'
    , ';(function() {'
    , content
    , '}).call(this);'
  ].join('\n')
}
