const config = require('config')
const Model = require('@hypefight/database')
const dbConfig = require('../../config/database')()

const tableName = config.get('dbTokensTableName')
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

module.exports = Model(tableName, modelSchema, modelOptions, dbConfig)
