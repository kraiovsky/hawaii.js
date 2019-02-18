const Koa = require('koa')
const Router = require('koa-router')
const serve = require('koa-static-server')
const slsHttp = require('serverless-http')
const { ReqResLogger, ErrorLogger } = require('@hypefight/logger')
const setResOk = require('@hypefight/next-koa')

const app = new Koa()
const router = new Router()

const slsPagesDir = './.next/serverless/pages'
const indexPage = slsPagesDir + '/index'
const errorPage = slsPagesDir + '/_error'

app.use(ReqResLogger())
app.on('error', ErrorLogger())
app.use(setResOk())

app.use(
  serve({
    rootDir: './.next/static',
    rootPath: '/_next/static',
    notFoundFile: errorPage,
  })
)
app.use(
  serve({
    rootDir: process.env.ASSETS_URL,
    rootPath: '/assets',
    notFoundFile: errorPage,
  })
)

router.get('/', ctx => require(indexPage).render(ctx.req, ctx.res))
router.get('*', async ctx => {
  try {
    const pathname = ctx.req._parsedUrl.pathname
    await require(slsPagesDir + pathname).render(ctx.req, ctx.res)
  } catch (err) {
    await require(errorPage).render(ctx.req, ctx.res)
  }
})
app.use(router.middleware())

module.exports.handler = slsHttp(app)
