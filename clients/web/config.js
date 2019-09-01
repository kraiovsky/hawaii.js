const config = {
  development: {
    usersApiUrl: 'http://localhost:5001',
    authApiUrl: 'http://localhost:5002/auth',
    s3BucketUrl: '',
  },
  production: {
    usersApiUrl: '',
    authApiUrl: '',
    s3BucketUrl: '',
  },
}
const env = process.env.NODE_ENV || 'development'

module.exports = () => config[env]
