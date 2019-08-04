const {
  dbQueries: { mockFindByKey },
} = require('@hypefight/test-helpers')
const mockUsersDB = require('../../../__fixtures__/users')
const mockNewUser = require('../../../__fixtures__/newUser')

module.exports = {
  create: (ctx, email) => {
    const mockExistingUser = mockFindByKey(mockUsersDB, 'email', email)
    const user = mockExistingUser || mockNewUser
    return {
      data: user,
      created: Date.parse(user.createdAt) === Date.parse(user.updatedAt),
    }
  },
  find: (ctx, query) => {
    const user = mockFindByKey(mockUsersDB, Object.keys(query)[0], Object.values(query)[0])
    return user
  },
}
