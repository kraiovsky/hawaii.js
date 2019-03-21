const config = {
  development: {
    usersApiUrl: 'http://localhost:5001/users',
    authApiUrl: 'http://localhost:5002/auth',
  },
  test: {},
  production: {},
}
const env = process.env.NODE_ENV || 'development'

export default () => config[env]
