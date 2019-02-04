module.exports = {
  create: {
    happy: [
      ['admin@domain.com', 200, 'return existing user object and status 200'],
      ['user@domain.com', 201, 'return new user object and status 201'],
    ],
  },
}
