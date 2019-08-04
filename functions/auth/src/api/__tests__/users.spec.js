const { createMockContext } = require('@shopify/jest-koa-mocks')
const { createUserMock } = require('../../../../users/__mocks__/v1')
const Users = require('../users')
const tesCases = require('./users.cases')

let ctx
beforeEach(async () => {
  ctx = createMockContext({
    state: {
      config: { usersApiUrl: 'http://localhost:5001' },
      serviceToken: '',
    },
    header: { 'x-request-id': '123-abc-456' },
  })
  ctx.response.get = jest.fn(header => ctx.headers[header])
  createUserMock()
})

describe('create()', () => {
  describe.each(tesCases.create.happy)('👍', (email, resStatusCode, expected) => {
    test(`should ${expected}`, async () => {
      ctx.request.body = { email }
      const { statusCode, body } = await Users.create(ctx)
      expect(body).toMatchSnapshot()
      expect(statusCode).toBe(resStatusCode)
    })
  })
})
