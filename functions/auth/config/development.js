module.exports = {
  confirmTokenMaxAge: '5m',
  refreshTokenMaxAge: '30d',
  accessTokenMaxAge: '5m',
  email: 'no-reply@hawaii.js',
  usersApiUrl: 'http://localhost:5001',
  webClientUrl: 'http://localhost:5003',
  // add config for your mail server i.e. https://ethereal.email; see https://nodemailer.com/about/
  smtp: {
    host: '',
    port: '',
    secure: '',
    auth: {
      user: '',
      pass: '',
    },
  },
}
