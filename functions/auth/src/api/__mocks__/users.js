const {
  queries: { mockFindByKey },
  fixtures: { mockUsersDB, mockNewUser },
} = require('@hypefight/test-helpers')

module.exports = {
  create: jest.fn(ctx => {
    const {
      request: {
        body: { email },
      },
    } = ctx

    const user = mockFindByKey(mockUsersDB, 'email', email)

    return user
      ? {
          statusCode: 200,
          body: { ...user },
        }
      : {
          statusCode: 201,
          body: {
            ...mockNewUser,
            email,
          },
        }
  }),
}
