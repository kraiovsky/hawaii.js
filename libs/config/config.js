module.exports = {
  development: {
    projectName: 'Hypefight',
    email: 'mail@hypefight.io',
    usersApiUrl: 'http://localhost:5001/v1/users',
    xReqIdHeader: 'x-request-id',
    accessTokenMaxAge: '5m',
    serviceTokenMaxAge: '20s',
    smtp: {
      host: 'smtp.ethereal.email',
      port: 587,
      secure: '',
      auth: {
        user: 'nc5oh62o3vf455cy@ethereal.email',
        pass: '2QRjWypntsPve5nXPF',
      },
    },
  },
}
