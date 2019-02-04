module.exports = {
  serviceName: 'auth',
  jwtSecret: process.env.AUTH_JWT_SECRET,
  confirmTokenMaxAge: '5m',
  refreshTokenMaxAge: '30d',
}
