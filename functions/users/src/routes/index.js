const Router = require('koa-joi-router')
const router = Router()

router.use('/v1/users', require('./v1'))

module.exports = router
