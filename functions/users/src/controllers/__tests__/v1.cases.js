module.exports = {
  createUser: {
    happy: [
      ['return existing user', 'email@domain.com'],
      ['return new user', 'newemail@domain.com'],
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
