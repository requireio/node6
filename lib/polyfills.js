var es6ShimPath = JSON.stringify(require.resolve('es6-shim'))

module.exports = polyfills

function polyfills(content) {
  return [
      "var globals = (typeof global === 'undefined') ? window : global"
    , ';globals.__SHIMMED = globals.__SHIMMED || require('+es6ShimPath+');'
    , content
  ].join('\n')
}
