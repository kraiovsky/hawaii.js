const config = {
  development: {
    usersApiUrl: 'http://localhost:5001',
    authApiUrl: 'http://localhost:5002/auth',
  },
  production: {
    usersApiUrl: '',
    authApiUrl: '',
  },
}
const env = process.env.NODE_ENV || 'development'

module.exports = () => config[env]
