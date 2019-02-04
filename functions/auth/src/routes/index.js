const Router = require('koa-joi-router')
const router = Router()

router.use('/auth', require('./auth'))

module.exports = router
