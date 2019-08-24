import { Auth as authApi } from '../api'
import createAuthApiMock from '../../../functions/auth/__mocks__/auth'

createAuthApiMock()

describe('Auth service API', () => {
  test(`should send magic link`, async () => {
    const email = 'valid@email.com'
    let status
    try {
      const res = await authApi.MagicLink.send({ body: { email } })
      status = res.status()
    } catch {}
    expect(status).toEqual(200)
  })
  test(`should fail to send magic link`, async () => {
    const email = 'wrong_email.com'
    let status
    try {
      await authApi.MagicLink.send({ body: { email } })
    } catch (e) {
      status = e.status()
    }
    expect(status).toEqual(400)
  })
  test(`should confirm magic link`, async () => {
    const token = 'valid_token'
    let status
    let body
    try {
      const res = await authApi.MagicLink.confirm({ token })
      status = res.status()
      body = res.data()
    } catch {}
    expect(status).toEqual(200)
    expect(body).toEqual({ access_token: 'access_token', refresh_token: 'refresh_token' })
  })
  test(`should fail to confirm magic link`, async () => {
    const token = 'invalid_token'
    let status
    try {
      await authApi.MagicLink.confirm({ token })
    } catch (e) {
      status = e.status()
    }
    expect(status).toEqual(401)
  })
  test(`should refresh token`, async () => {
    const token = 'valid_token'
    let status
    let body
    try {
      const res = await authApi.Token.refresh({ body: { refresh_token: token } })
      status = res.status()
      body = res.data()
    } catch {}
    expect(status).toEqual(200)
    expect(body).toEqual({ access_token: 'access_token', refresh_token: 'refresh_token' })
  })
  test(`should fail to refresh token`, async () => {
    const token = 'invalid_token'
    let status
    try {
      await authApi.Token.refresh({ body: { refresh_token: token } })
    } catch (e) {
      status = e.status()
    }
    expect(status).toEqual(401)
  })
})
