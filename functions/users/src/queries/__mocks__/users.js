const {
  queries: { mockFindByKey },
} = require('@hypefight/test-helpers')
const mockUsersDB = require('@hypefight/test-helpers/fixtures/users')
const mockNewUser = require('@hypefight/test-helpers/fixtures/newUser')

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
