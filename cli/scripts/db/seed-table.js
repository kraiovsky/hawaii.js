const { env, pwd, exit } = require('shelljs')
const buildDbTableName = require(pwd() + '/cli/utils/build-db-table-name')
const fileExists = require(pwd() + '/cli/utils/file-exists')

module.exports = async argv => {
  const { modelNameLowercased, nodeConfig } = buildDbTableName(argv)
  env.NODE_ENV = argv.environment
  env.NODE_CONFIG = nodeConfig

  const seedFile = pwd() + `/functions/${argv.function}/seeders/${modelNameLowercased}.js`
  if (!fileExists(seedFile)) {
    console.error(`🌱 🚫 Seeding failed: ${seedFile} does not exist.`)
    exit(0)
  }
  const Seed = require(seedFile)
  await Seed()
  await console.log(`🌱 Users seeded.`)
}
