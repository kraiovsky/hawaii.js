const Koa = require('koa')
const serve = require('koa-static-server')
const config = require('config')
const setSessionConfig = require('@hypefight/config')
const { ReqResLogger, ErrorLogger } = require('@hypefight/logger')
const setResOk = require('@hypefight/next-koa')
const routes = require('./routes')

const app = new Koa()

app.use(ReqResLogger())
app.on('error', ErrorLogger())
app.use(setSessionConfig())
app.use(setResOk())

app.use(
  serve({
    rootDir: './.next/static',
    rootPath: '/_next/static',
    notFoundFile: './.next/serverless/pages/_error',
  })
)
app.use(
  serve({
    rootDir: './assets',
    rootPath: config.get('assetsUrl'),
    notFoundFile: './.next/serverless/pages/_error',
  })
)

app.use(routes.middleware())

module.exports = app
