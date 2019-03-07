const Koa = require('koa')
const Router = require('koa-router')
const Cors = require('@koa/cors')
const Helmet = require('koa-helmet')
const serve = require('koa-static')
const send = require('koa-sendfile')
const respond = require('koa-respond')
const path = require('path')
const errorHandler = require('@hypefight/error-handler')
const { ReqResLogger, ErrorLogger } = require('@hypefight/logger')
const setSessionConfig = require('@hypefight/config')
const setReqIdHeader = require('@hypefight/request-id')
const errors = require('../config/errors')

const app = new Koa()
const router = new Router()

app.use(ReqResLogger())
app.on('error', ErrorLogger())
app.use(errorHandler(errors))
app.use(setSessionConfig())
app.use(setReqIdHeader())
app.use(Helmet())
app.use(Cors())
app.use(respond())

app.use(serve(path.join(__dirname, '..', 'build'), { 
  maxage: 1000 * 60 * 60 * 24 * 30 // 30 days
}))
router.get('*', async ctx => {
  try {
    await ctx.send('index.html')
  } catch (error) {
    console.log(error)
  }
})
app.use(router.routes())
app.use(router.allowedMethods())

module.exports = app
