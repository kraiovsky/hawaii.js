const config = require('config')
const Model = require('@hawaii-js/database')
const dbConfig = require('../../config/database')()

const modelSchema = {
  uid: {
    type: String,
    hashKey: true,
    required: true,
  },
  refreshToken: {
    type: String,
    default: '',
  },
}

const modelOptions = {
  throughput: 5,
  timestamps: true,
}

module.exports = () => {
  const tableName = config.get('dbTokensTableName')
  return Model(tableName, modelSchema, modelOptions, dbConfig)
}
