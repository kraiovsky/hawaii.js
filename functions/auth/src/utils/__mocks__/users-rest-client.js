const {
  queries: { mockFindByKey },
  fixtures: { mockUsersDB, mockNewUser },
} = require('@hypefight/test-helpers')

module.exports = {
  create: jest.fn((reqBody, ctxState) => {
    const user = mockFindByKey(mockUsersDB, 'email', reqBody.email)
    return user
      ? {
          created: false,
          data: { data: { id: user.id, attributes: user } },
        }
      : {
          created: true,
          data: {
            data: {
              id: mockNewUser.id,
              attributes: {
                ...mockNewUser,
                email: reqBody.email,
              },
            },
          },
        }
  }),
}
