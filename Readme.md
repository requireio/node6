# node6

```bash
> node6 es6app.js
```

```bash
> node6 -e "{let test = function *() {yield 3; yield 4}; let t = test(); console.log(t.next().value, t.next().value);}"
3 4
```
