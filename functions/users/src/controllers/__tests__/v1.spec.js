const { createMockContext } = require('@shopify/jest-koa-mocks')
const { createUser, findUser } = require('../v1')
const testCases = require('./v1.cases')

jest.mock('../../queries/users')

let ctx
beforeEach(() => {
  ctx = createMockContext()
  ctx = {
    ...ctx,
    set: jest.fn(headers => {
      ctx.headers = {
        ...ctx.headers,
        ...headers,
      }
    }),
    send: jest.fn((status, body) => {
      ctx.response = { status, body }
    }),
    ok: jest.fn(body => ctx.send(200, body)),
    throw: jest.fn(() =>
      ctx.send(500, {
        errors: [
          {
            status: 500,
            title: 'INTERNAL_SERVER_ERROR',
            detail: 'Internal Server Error',
          },
        ],
      })
    ),
    fail: jest.fn(({ code, msg, info }) =>
      ctx.send(code || 500, {
        errors: [
          {
            status: code || 500,
            title: msg || 'INTERNAL_SERVER_ERROR',
            detail: info || 'ctx.fail called',
          },
        ],
      })
    ),
  }
})
afterEach(() => {
  jest.clearAllMocks()
})

describe('createUser()', () => {
  describe.each(testCases.createUser.happy)('👍', (should, email) => {
    test(`should ${should}`, async () => {
      ctx.request = {
        body: {
          email,
        },
      }
      await createUser()(ctx)
      expect(ctx.send).toHaveBeenCalled()
      expect(ctx.response).toMatchSnapshot()
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
      expect(ctx.ok).toHaveBeenCalled()
      expect(ctx.response).toMatchSnapshot()
    })
  })
})
