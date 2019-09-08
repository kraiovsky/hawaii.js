Error handler middleware

## How to use
```javascript
const Koa = require('koa')
const errorHandler = require('@hawaii-js/error-handler')

const app = new Koa()
app.use(errorHandler())

module.exports = app
```
