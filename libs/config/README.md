Helper library to set config as Koa context for a session

Can take local function config (i.e. retrieved through node-config module), merge it with global config maintained in the library, and set it as Koa's `ctx.state.config`

## How to use
```javascript
const Koa = require('koa')
const config = require('config')
const sessionConfig = require('@hawaii-js/config')

const app = new Koa()
app.use(sessionConfig(config))

module.exports = app
```
