module.exports = {
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  jwtSecret: process.env.AUTH_JWT_SECRET,
  dbUsersTableName: process.env.DB_USERS_TABLE_NAME,
}
