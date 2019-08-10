const Koa = require('koa')
const Cors = require('@koa/cors')
const Helmet = require('koa-helmet')
const logger = require('koa-pino-logger')
const responseTime = require('koa-response-time')
const config = require('config')
const errorHandler = require('@hypefight/error-handler')
const sessionConfig = require('@hypefight/config')
const requestId = require('@hypefight/request-id')
const routes = require('./routes')

const app = new Koa()

app.use(responseTime())
app.use(
  logger({
    prettyPrint: true,
    redact: {
      paths: [],
      censor: '**MASKED**',
    },
  })
)
app.use(errorHandler())
app.use(sessionConfig(config))
app.use(requestId())
app.use(Helmet())
app.use(Cors())
app.use(routes.middleware())

module.exports = app
