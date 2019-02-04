/**
 * @file A collection of test helpers:
 * DB queries mocks;
 * Shared Users DB fixtures.
 */
module.exports = {
  queries: require('./lib/queries'),
  fixtures: {
    mockUsersDB: require('./fixtures/users'),
    mockNewUser: require('./fixtures/newUser'),
  },
}
