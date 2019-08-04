const { createMockContext } = require('@shopify/jest-koa-mocks')
const { createUser, findUser } = require('../v1')
const testCases = require('./v1.cases')

jest.mock('../../queries/users')

let ctx
beforeEach(() => {
  ctx = createMockContext()
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('createUser()', () => {
  describe.each(testCases.createUser.happy)('👍', (should, email, statusCode) => {
    test(`should ${should}`, async () => {
      ctx.request = {
        body: {
          email,
        },
      }
      await createUser()(ctx)
      expect(ctx.response.status).toEqual(statusCode)
      expect(ctx.response.body).toMatchSnapshot()
    })
  })
})

describe('findUser()', () => {
  describe.each(testCases.findUser.happy)('👍', (should, fields, email) => {
    test(`should ${should}`, async () => {
      ctx.query = {
        'fields[users]': fields,
        searchKey: 'email',
      }
      ctx.params = {
        searchQuery: email,
      }
      await findUser()(ctx)
      expect(ctx.response.body).toMatchSnapshot()
    })
  })
})
