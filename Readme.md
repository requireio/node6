# node6

### hacking all the transpilers and polyfills together to transparently support much es6 in node

### CLI

```bash
> node6 es6app.js
```

```bash
> node6 -e "{let test = function *() {yield 3; yield 4}; let t = test(); console.log(t.next().value, t.next().value);}"
3 4
```

### MODULE

```js
// mymodule.js

let test = function *() {yield 3; yield 4};
module.exports = test()

```

```js
// index.js
require('node6')(__dirname) // enable node6 for this module (but not inner node_modules)
var t = require('./mymodule')
console.log(t.next().value) // 3
console.log(t.next().value) // 4

```
