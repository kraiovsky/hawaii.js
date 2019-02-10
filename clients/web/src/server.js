const Koa = require('koa')
const compress = require('koa-compress')
const routes = require('./routes')

const app = new Koa()

app.use(routes.middleware())
app.use(compress())
app.use(async (ctx, next) => {
  ctx.res.statusCode = 200
  await next()
})

module.exports = app
