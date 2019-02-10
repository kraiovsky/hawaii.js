const Router = require('koa-router')

const router = new Router()
const slsPagesDir = '../.next/serverless/pages'

router.get('/', ctx => require(slsPagesDir + '/index').render(ctx.req, ctx.res))
router.get('*', async ctx => {
  try {
    const pathname = ctx.req._parsedUrl.pathname
    await require(slsPagesDir + pathname).render(ctx.req, ctx.res)
  } catch (err) {
    await require(slsPagesDir + '/_error').render(ctx.req, ctx.res)
  }
})

module.exports = router
