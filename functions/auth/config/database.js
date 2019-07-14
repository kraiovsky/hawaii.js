module.exports = () => {
  const config = {
    development: {
      region: 'eu-north-1',
      accessKeyId: '',
      secretAccessKey: '',
    },
    production: {
      region: 'eu-north-1',
      accessKeyId: process.env.AWS_AKID,
      secretAccessKey: process.env.AWS_SAK,
    },
  }
  const env = process.env.NODE_ENV || 'development'
  return config[env]
}
