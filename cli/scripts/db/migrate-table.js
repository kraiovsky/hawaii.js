const { env, pwd } = require('shelljs')
const buildDbTableName = require(pwd() + '/cli/utils/build-db-table-name')

module.exports = async argv => {
  const { modelNameLowercased, tableNameValue, nodeConfig } = buildDbTableName(argv)
  env.NODE_ENV = argv.environment
  env.NODE_CONFIG = nodeConfig

  const Model = require(pwd() + `/functions/${argv.function}/src/models/${modelNameLowercased}`)
  await Model()
  await console.log(`🎉 ${tableNameValue} successfully migrated.`)
}
