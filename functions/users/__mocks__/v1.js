const nock = require('nock')
const {
  dbQueries: { mockFindByKey },
} = require('@hypefight/test-helpers')
const { Serializer } = require('@hypefight/json-api-serializer')
const userSchema = require('../src/schemas/generators')
const mockUsersDB = require('../__fixtures__/users')
const mockNewUser = require('../__fixtures__/newUser')

const usersApiUrl = 'http://localhost:5001'

const createUserMock = () => {
  nock(usersApiUrl)
    .post('/v1/users')
    .delay(1000)
    .reply((uri, { email }) => {
      let body
      let status
      const user = mockFindByKey(mockUsersDB, 'email', email)
      if (user) {
        body = Serializer('user', userSchema(''), user)
        status = 200
      } else {
        body = Serializer('user', userSchema(''), {
          ...mockNewUser,
          email,
        })
        status = 201
      }
      return [status, body]
    })
}

module.exports = {
  createUserMock,
}
