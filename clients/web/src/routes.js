const Router = require('koa-router')

const router = new Router()
const slsPagesDir = '../.next/serverless/pages'

router.get('*', async ctx => {
  try {
    await require(slsPagesDir + ctx.req._parsedUrl.pathname).render(ctx.req, ctx.res)
  } catch (err) {
    await require(slsPagesDir + '/_error').render(ctx.req, ctx.res)
  }
})

module.exports = router
