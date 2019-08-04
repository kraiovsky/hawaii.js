module.exports = {
  createUser: {
    happy: [
      ['return existing user', 'email@domain.com', 200],
      ['return new user', 'newemail@domain.com', 201],
    ],
    sad: [],
  },
  findUser: {
    happy: [
      [
        'return user with all non-blacklisted if no field provided in query',
        undefined,
        'email@domain.com',
      ],
      [
        'return user with all non-blacklisted if empty field provided in query',
        '',
        'email@domain.com',
      ],
      ['return user with email and name', 'email,name,', 'email@domain.com'],
    ],
    sad: [],
  },
}
