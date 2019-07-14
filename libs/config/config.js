module.exports = () => {
  const config = {
    development: {
      projectName: 'Hawaii.js',
      requestIdHeader: 'x-request-id',
      serviceTokenMaxAge: '20s',
    },
    production: {
      projectName: 'Hawaii.js',
      requestIdHeader: 'x-request-id',
      serviceTokenMaxAge: '20s',
    },
  }
  const env = process.env.NODE_ENV || 'development'
  return config[env]
}
