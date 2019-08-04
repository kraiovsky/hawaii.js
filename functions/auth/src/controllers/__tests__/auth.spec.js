const { createMockContext } = require('@shopify/jest-koa-mocks')
const { generateToken } = require('@hypefight/auth-client/libs/token')
const {
  dbQueries: { mockFirstRecord },
} = require('@hypefight/test-helpers')
const mockUsersDB = require('../../../../users/__fixtures__/users')
const { createUserMock } = require('../../../../users/__mocks__/v1')
const {
  createUser,
  genConfirmToken,
  genClaimFromToken,
  genAccessRefreshTokens,
  upsertToken,
  updateToken,
  respondWithTokens,
  sendMagicLink,
} = require('../auth')
const { JWT_REGEX } = require('../../../config/constants')
const testCases = require('./auth.cases')

jest.mock('../../queries/tokens')
jest.mock('@hypefight/email-client')

const config = {
  refreshTokenMaxAge: '30d',
  confirmTokenMaxAge: '5m',
  accessTokenMaxAge: '5m',
  jwtSecret: 'test_secret',
  projectName: 'Prj Name',
  email: 'testmail@prj.com',
  serviceToken: '',
  usersApiUrl: 'http://localhost:5001',
}
const { uid, email, role: scope } = mockFirstRecord(mockUsersDB)
const jwtClaim = { uid, email, scope }

let ctx
const next = jest.fn()
beforeEach(() => {
  ctx = createMockContext({
    state: { config, jwtClaim },
    header: { 'x-request-id': '123-abc-456' },
  })
  ctx.set = jest.fn()
  ctx.response.get = jest.fn(header => ctx.headers[header])
  createUserMock()
})
afterEach(() => {
  jest.clearAllMocks()
})

/**
 * This is more an integration test, not pure unit test:
 * Users API client is not mocked, but rather calls Users service which returns mocked data.
 * It is done as I have not seen much value in testing simple setting of ctx state and writing boilerplate for Users API.
 * Instead, this is in line with testing strategy to have Users service own their data.
 */
describe('createUser()', () => {
  describe.each(testCases.createUser.happy)('👍', (should, email, expectCreated) => {
    test(`should ${should}`, async () => {
      ctx.request.body = { email }
      await createUser()(ctx, next)
      expect(ctx.state.userCreated).toBe(expectCreated)
      expect(ctx.state.jwtClaim).toMatchSnapshot()
      expect(next).toHaveBeenCalled()
    })
  })
})

describe('genConfirmToken()', () => {
  test(`👍 should generate confirmation token with JWT claim from state`, async () => {
    await genConfirmToken()(ctx, next)
    expect(ctx.state.confirmToken).toEqual(expect.stringMatching(JWT_REGEX))
    expect(next).toHaveBeenCalled()
  })
})

describe('genClaimFromToken()', () => {
  describe('GET /refresh', () => {
    test(`👍 should validate received refresh token and set state with JWT claim`, async () => {
      ctx.request = {
        body: {
          refresh_token: generateToken(jwtClaim, config.jwtSecret, config.refreshTokenMaxAge),
        },
        path: '/refresh',
      }
      await genClaimFromToken()(ctx, next)
      expect(ctx.state.jwtClaim).toMatchObject(jwtClaim)
      expect(next).toHaveBeenCalled()
    })
  })
  describe('GET /confirm', () => {
    describe('👍', () => {
      test(`should validate received confirmation token and set state with JWT claim`, async () => {
        ctx.request = {
          path: '/confirm',
          query: {
            token: generateToken(jwtClaim, config.jwtSecret, config.refreshTokenMaxAge),
          },
        }
        await genClaimFromToken()(ctx, next)
        expect(ctx.state.jwtClaim).toMatchObject(jwtClaim)
        expect(next).toHaveBeenCalled()
      })
    })
    describe('👎', () => {
      test(`should throw with 401, invalid token message and error object`, async () => {
        ctx.request = {
          path: '/confirm',
          query: {
            token: 'incorrect_token',
          },
        }
        await genClaimFromToken()(ctx, next)
        expect(ctx.throw).toHaveBeenCalledWith(401, expect.any(String), expect.any(Object))
      })
    })
  })
})

describe('genAccessRefreshTokens()', () => {
  test(`👍 should generate confirmation token with JWT claim from state`, async () => {
    await genAccessRefreshTokens()(ctx, next)
    expect(ctx.state.accessToken).toEqual(expect.stringMatching(JWT_REGEX))
    expect(ctx.state.refreshToken).toEqual(expect.stringMatching(JWT_REGEX))
    expect(next).toHaveBeenCalled()
  })
})

describe('upsertToken()', () => {
  describe.each(testCases.upsertToken.happy)('👍', (uid, token, expected) => {
    test(`should ${expected}`, async () => {
      ctx.state = {
        ...ctx.state,
        state: {
          jwtClaim: {
            uid: uid,
          },
          refreshToken: token,
        },
      }
      await upsertToken()(ctx, next)
      expect(next).toHaveBeenCalled()
    })
  })
  describe.each(testCases.upsertToken.sad)('👎', (uid, token, expected) => {
    test(`should ${expected}`, async () => {
      ctx.state = {
        ...ctx.state,
        state: {
          jwtClaim: {
            uid: uid,
          },
          refreshToken: token,
        },
      }
      await upsertToken()(ctx, next)
      expect(ctx.throw).toHaveBeenCalledWith(500, expect.any(String))
    })
  })
})

describe('updateToken()', () => {
  describe.each(testCases.updateToken.happy)('👍', (uid, oldToken, newToken, expected) => {
    test(`should ${expected}`, async () => {
      ctx.state = {
        ...ctx.state,
        state: {
          jwtClaim: {
            uid: uid,
          },
          refreshToken: newToken,
        },
      }
      ctx.request = {
        body: {
          refresh_token: oldToken,
        },
      }
      await updateToken()(ctx, next)
      expect(next).toHaveBeenCalled()
    })
  })
  describe.each(testCases.updateToken.sad)('👎', (uid, oldToken, newToken, errorCode, expected) => {
    test(`should ${expected}`, async () => {
      ctx.state = {
        ...ctx.state,
        state: {
          jwtClaim: {
            uid: uid,
          },
          refreshToken: newToken,
        },
      }
      ctx.request = {
        body: {
          refresh_token: oldToken,
        },
      }
      await updateToken()(ctx, next)
      expect(ctx.throw).toHaveBeenCalledWith(errorCode, expect.any(String))
    })
  })
})

describe('respondWithTokens()', () => {
  test('👍 should respond with token schema and cache headers according to RFC standard', async () => {
    ctx.state = {
      ...ctx.state,
      accessToken: 'access_token_sample',
      refreshToken: 'refresh_token_sample',
    }
    await respondWithTokens()(ctx)
    expect(ctx.set).toHaveBeenCalled()
    expect(ctx.response).toEqual(
      expect.objectContaining({
        message: 'OK',
        body: {
          access_token: 'access_token_sample',
          token_type: 'Bearer',
          expires_in: 300000,
          refresh_token: 'refresh_token_sample',
        },
        status: 200,
      })
    )
  })
})

describe('sendMagicLink()', () => {
  test(`should generate magic link email, send it and return 200 OK`, async () => {
    ctx.state = {
      ...ctx.state,
      userCreated: true,
      confirmToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIwYWU3NmM4NC1kOTM5LTQ1NmQtYmIzNS1mNjBiNzY1OWVkNmIiLCJlbWFpbCI6ImFkbWluQGRvbWFpbi5jb20iLCJzY29wZSI6ImFkbWluIiwiaWF0IjoxNTQ3ODk4ODMzLCJleHAiOjE1NDc4OTkxMzN9.Be1EcClKctfkYaNhAb02IimShm3ahf9yQzqhC0N0new',
    }
    await sendMagicLink()(ctx)
    expect(ctx.response).toEqual(
      expect.objectContaining({
        body: {
          status: 'OK',
          message: 'confirmation token sent',
        },
        status: 201,
      })
    )
  })
})
