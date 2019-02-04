const nock = require('nock')
const {
  queries: { mockFindByKey },
  fixtures: { mockUsersDB, mockNewUser },
} = require('@hypefight/test-helpers')
const Users = require('../users-rest-client')
const tesCases = require('./users-rest-client.cases')

const serviceToken = ''
const usersApiUrl = 'http://localhost:5001/v1/users'

const newUserObject = email => ({
  created: true,
  data: {
    id: expect.any(String),
    email: email,
    name: null,
    role: 'user',
    avatar: null,
    updatedAt: expect.any(String),
    createdAt: expect.any(String),
  },
})
const oldUserObject = email => ({
  created: false,
  data: {
    id: expect.any(String),
    email: email,
    name: expect.any(String),
    role: 'admin',
    avatar: null,
    updatedAt: expect.any(String),
    createdAt: expect.any(String),
  },
})

describe('create()', () => {
  describe.each(tesCases.create.happy)('👍', async (email, resStatusCode, expected) => {
    nock(usersApiUrl)
      .post('/')
      .reply(
        resStatusCode,
        mockFindByKey(mockUsersDB, 'email', email) || { ...mockNewUser, email: email }
      )
    test(`should ${expected}`, async () => {
      const user = await Users.create({ email }, { serviceToken, config: { usersApiUrl } })
      expect(user).toMatchObject(
        resStatusCode === 201 ? newUserObject(email) : oldUserObject(email)
      )
    })
  })
})
