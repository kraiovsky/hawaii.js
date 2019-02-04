const Koa = require('koa')
const Cors = require('@koa/cors')
const Helmet = require('koa-helmet')
const respond = require('koa-respond')
const errorHandler = require('@hypefight/error-handler')
const setSessionConfig = require('@hypefight/config')
const { ReqResLogger, ErrorLogger } = require('@hypefight/logger')
const setReqIdHeader = require('@hypefight/request-id')
const routes = require('./routes')
const errors = require('../config/errors')

const app = new Koa()

app.use(ReqResLogger())
app.on('error', ErrorLogger())
app.use(errorHandler(errors))
app.use(setSessionConfig())
app.use(setReqIdHeader())
app.use(Helmet())
app.use(Cors())
app.use(respond())
app.use(routes.middleware())

module.exports = app
