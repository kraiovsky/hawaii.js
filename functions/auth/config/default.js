module.exports = {
  port: process.env.PORT,
  serviceName: process.env.SERVICE_NAME,
  jwtSecret: process.env.AUTH_JWT_SECRET,
  dbTokensTableName: process.env.DB_TOKENS_TABLE_NAME,
}
