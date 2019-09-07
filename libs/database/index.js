/**
 * @file Wrapper over Dynamoose and AWS DynamoDB.
 */
const dynamoose = require('dynamoose')

/**
 * Connects to DynamoDB and creates a data model.
 * Depending on the environment, will connect to local or remote server.
 *
 * @param {string} modelName - DynamoDB model name.
 * @param {object} modelSchema - DynamoDB model schema definition.
 * @param {object} modelOptions - DynamoDB model options.
 * @param {object} dbConfig - DynamoDB connection config.
 *
 * @returns {object} DynamoDB model factory.
 */
module.exports = (modelName, modelSchema, modelOptions, dbConfig) => {
  dynamoose.AWS.config.update(dbConfig)
  if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
    dynamoose.local()
  }
  const Schema = dynamoose.Schema
  const schema = new Schema(modelSchema, modelOptions)
  schema.statics.deleteTable = () => {
    const dynamoDB = dynamoose.ddb()
    dynamoDB.deleteTable({ TableName: modelName }, (err, resp) => {
      if (err) console.error(err)
      process.exit(0)
    })
  }
  return dynamoose.model(modelName, schema)
}
