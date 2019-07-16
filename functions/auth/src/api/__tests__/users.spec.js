const nock = require('nock')
const {
  queries: { mockFindByKey },
  fixtures: { mockUsersDB, mockNewUser },
} = require('@hypefight/test-helpers')
const Users = require('../users')
const tesCases = require('./users.cases')

const serviceToken = ''
const usersApiUrl = 'http://localhost:5001'

const newUserObject = email => ({
  id: expect.any(String),
  email,
  name: null,
  role: 'user',
  avatar: null,
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
})
const oldUserObject = email => ({
  id: expect.any(String),
  email,
  name: expect.any(String),
  role: 'admin',
  avatar: null,
  updatedAt: expect.any(String),
  createdAt: expect.any(String),
})

const requestIdHeader = 'x-request-id'
const reqHeaders = {
  [requestIdHeader]: '123-abc-456',
}

let ctx = {
  response: {
    get: jest.fn(header => ctx.headers[header]),
  },
}

describe('create()', () => {
  describe.each(tesCases.create.happy)('👍', (email, resStatusCode, expected) => {
    nock(usersApiUrl)
      .post('/v1/users')
      .reply(
        resStatusCode,
        mockFindByKey(mockUsersDB, 'email', email) || { ...mockNewUser, email },
        reqHeaders
      )

    ctx = {
      ...ctx,
      request: {
        body: { email },
      },
      state: {
        serviceToken,
        config: { usersApiUrl, requestIdHeader },
      },
      headers: reqHeaders,
    }

    test(`should ${expected}`, async () => {
      const { statusCode, body, headers } = await Users.create(ctx)
      expect(body).toMatchObject(
        resStatusCode === 201 ? newUserObject(email) : oldUserObject(email)
      )
      expect(statusCode).toBe(resStatusCode)
      expect(headers).toMatchObject(reqHeaders)
    })
  })
})
