require('dotenv').config()
const slsHttp = require('serverless-http')
const server = require('./src/server')

module.exports.handler = slsHttp(server)
