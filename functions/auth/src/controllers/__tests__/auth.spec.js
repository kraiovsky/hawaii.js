const { createMockContext } = require('@shopify/jest-koa-mocks')
const { generateToken } = require('@hypefight/auth-client/libs/token')
const {
  queries: { mockFirstRecord },
  fixtures: { mockUsersDB },
} = require('@hypefight/test-helpers')
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
jest.mock('../../utils/users-rest-client')
jest.mock('@hypefight/email-client')

const config = {
  refreshTokenMaxAge: '30d',
  confirmTokenMaxAge: '5m',
  accessTokenMaxAge: '5m',
  jwtSecret: 'test_secret',
  projectName: 'Prj Name',
  email: 'testmail@prj.com',
}
const { uid, email, role: scope } = mockFirstRecord(mockUsersDB)
const jwtClaim = { uid, email, scope }

let ctx
const next = jest.fn()
beforeEach(() => {
  ctx = createMockContext({ state: { config, jwtClaim } })
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
  describe.each(testCases.createUser.happy)('👍', (should, email, expectCreated) => {
    test(`should ${should}`, async () => {
      ctx.request = {
        body: {
          email,
        },
      }
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
      ctx.path = '/refresh'
      ctx.request = {
        body: {
          refresh_token: generateToken(jwtClaim, config.jwtSecret, config.refreshTokenMaxAge),
        },
      }
      await genClaimFromToken()(ctx, next)
      expect(ctx.state.jwtClaim).toMatchObject(jwtClaim)
      expect(next).toHaveBeenCalled()
    })
  })
  describe('GET /confirm', () => {
    describe('👍', () => {
      test(`should validate received confirmation token and set state with JWT claim`, async () => {
        ctx.path = '/confirm'
        ctx.query = {
          token: generateToken(jwtClaim, config.jwtSecret, config.refreshTokenMaxAge),
        }
        await genClaimFromToken()(ctx, next)
        expect(ctx.state.jwtClaim).toMatchObject(jwtClaim)
        expect(next).toHaveBeenCalled()
      })
    })
    describe('👎', () => {
      test(`should fail with incorrect token message`, async () => {
        ctx.path = '/confirm'
        ctx.query = {
          token: 'incorrect_token',
        }
        await genClaimFromToken()(ctx, next)
        expect(ctx.fail).toHaveBeenCalled()
        expect(ctx.response).toMatchSnapshot()
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
      expect(ctx.fail).toHaveBeenCalled()
      expect(ctx.response).toMatchSnapshot()
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
  describe.each(testCases.updateToken.sad)('👎', (uid, oldToken, newToken, expected) => {
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
      expect(ctx.fail).toHaveBeenCalled()
      expect(ctx.response).toMatchSnapshot()
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
    expect(ctx.headers).toEqual(
      expect.objectContaining({
        'cache-control': 'no-store',
        pragma: 'no-cache',
      })
    )
    expect(ctx.ok).toHaveBeenCalled()
    expect(ctx.response).toMatchObject({
      body: {
        access_token: 'access_token_sample',
        token_type: 'Bearer',
        expires_in: 300000,
        refresh_token: 'refresh_token_sample',
      },
      status: 200,
    })
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
    expect(ctx.send).toHaveBeenCalled()
    expect(ctx.response).toMatchObject({
      body: {
        status: 'OK',
        message: 'confirmation token sent',
      },
      status: 201,
    })
  })
})
