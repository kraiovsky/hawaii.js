// require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const next = require('next')
const serve = require('koa-static-server')
const { ReqResLogger, ErrorLogger } = require('@hypefight/logger')
const setResOk = require('@hypefight/next-koa')

const server = new Koa()
const router = new Router()

const app = next({ dev: true })
const handle = app.getRequestHandler()

const errorPage = './.next/static/development/pages/_error'
const PORT = process.env.PORT || 3000

app.prepare().then(() => {
  server.use(ReqResLogger())
  server.on('error', ErrorLogger())
  server.use(setResOk())

  server.use(
    serve({
      rootDir: process.env.ASSETS_URL,
      rootPath: '/assets',
      notFoundFile: errorPage,
    })
  )

  router.get('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })
  server.use(router.middleware())

  server.listen(PORT, () => {
    console.log(`Web client started on ${PORT}`)
  })
})
