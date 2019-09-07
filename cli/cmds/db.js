const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec } = require('shelljs')

const demandOptions = require('../utils/demand-options')
const seedTable = require('../scripts/db/seed-table')
const migrateTable = require('../scripts/db/migrate-table')
const deleteTable = require('../scripts/db/delete-table')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('DynamoDB CLI.'))
  .middleware([])
  .option('environment', {
    alias: 'e',
    describe: chalk.yellow('execution environment'),
    type: 'string',
    choices: ['development', 'test', 'production'],
    default: 'development',
  })
  .option('function', {
    alias: 'f',
    describe: chalk.yellow('function to execute command for'),
    type: 'string',
  })
  .option('table', {
    alias: 't',
    describe: chalk.yellow('DB table to execute command for'),
    type: 'string',
  })
  .command({
    command: 'delete',
    desc: chalk.bold.green('delete table'),
    handler: async argv => {
      demandOptions(['environment', 'function', 'table'], argv)
      await deleteTable(argv)
    },
  })
  .command({
    command: 'migrate',
    desc: chalk.bold.green('build table'),
    handler: async argv => {
      demandOptions(['environment', 'function', 'table'], argv)
      await migrateTable(argv)
    },
  })
  .command({
    command: 'seed',
    desc: chalk.bold.green('seed table'),
    handler: async argv => {
      demandOptions(['environment', 'function', 'table'], argv)
      await seedTable(argv)
    },
  })
  .command({
    command: 'reset',
    desc: chalk.bold.red('reset table (delete-build-seed)'),
    handler: async argv => {
      demandOptions(['environment', 'function', 'table'], argv)
      exec(`yarn db delete -f ${argv.function} -t ${argv.table} -e ${argv.environment}`)
      exec(`yarn db migrate -f ${argv.function} -t ${argv.table} -e ${argv.environment}`)
      exec(`yarn db seed -f ${argv.function} -t ${argv.table} -e ${argv.environment}`)
    },
  })
  .command({
    command: 'start',
    desc: chalk.bold.green('start local DynamoDB server'),
    handler: argv =>
      exec(
        `docker run --rm -v $(pwd)/.dynamodb-local:/data/ -p 8000:8000 amazon/dynamodb-local -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -dbPath /data`
      ),
  })
  .command({
    command: 'admin',
    desc: chalk.bold.green('start local admin tool'),
    handler: argv => exec(`dynamodb-admin`),
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
