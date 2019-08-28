const faker = require('faker')

const User = require('../src/models/users')

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

module.exports = User.batchPut(users, (err, data) => {
  console.log(err ? JSON.stringify(err, null, 2) : '🌱 users table seeded.')
})
