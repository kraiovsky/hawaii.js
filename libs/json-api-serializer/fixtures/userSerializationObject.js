module.exports = {
  id: 'id',
  whitelist: ['firstName', 'lastName', 'email', 'gender', 'role'],
  blacklist: ['active'],
  links: {
    self: data => `/users/${data.id}`,
  },
  relationships: {},
  topLevelMeta: meta => meta,
  topLevelLinks: {
    index: '/users',
  },
}
