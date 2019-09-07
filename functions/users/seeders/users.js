const faker = require('faker')

const User = require('../src/models/users')

module.exports = async () => {
  const users = []
  let i = 10
  while (i--) {
    const user = {
      email: i === 0 ? 'admin@domain.com' : faker.internet.email(),
      name: faker.name.findName(),
      avatar: faker.image.imageUrl(800, 800, 'avatar', true),
      role: i === 0 ? 'admin' : 'user',
    }
    users.push(user)
  }
  User().batchPut(users, (err, data) => {
    if (err) console.error(JSON.stringify(err, null, 2))
  })
}
