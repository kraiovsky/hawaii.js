const Koa = require('koa')
const routes = require('./routes')

const app = new Koa()

app.use(routes.middleware())
app.use(async (ctx, next) => {
  ctx.res.statusCode = 200
  await next()
})

module.exports = app
