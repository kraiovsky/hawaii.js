const nock = require('nock')

const authApiUrl = 'http://localhost:5002/auth'

module.exports = () =>
  nock(authApiUrl)
    .post('/login', { email: 'valid@email.com' })
    .delay(500)
    .reply(200, 'ok')

    .post('/login')
    .delay(500)
    .reply(400, 'error')

    .get('/confirm')
    .query({ token: 'valid_token' })
    .delay(500)
    .reply(200, { access_token: 'access_token', refresh_token: 'refresh_token' })

    .get('/confirm')
    .query(true)
    .delay(500)
    .reply(401, { error: 'error' })

    .post('/refresh', { refresh_token: 'valid_token' })
    .delay(500)
    .reply(200, { access_token: 'access_token', refresh_token: 'refresh_token' })

    .post('/refresh')
    .delay(500)
    .reply(401, { error: 'error' })
