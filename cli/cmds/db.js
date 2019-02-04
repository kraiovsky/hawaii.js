const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, env } = require('shelljs')

const demandOptions = require('../utils/demand-options')

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
  .command({
    command: 'migrate',
    desc: chalk.bold.green('build table'),
    handler: argv => {
      demandOptions(['environment', 'function'], argv)
      env['NODE_ENV'] = argv.environment
      exec(`node functions/${argv.function}/src/models/${argv.function}`)
    },
  })
  .command({
    command: 'seed',
    desc: chalk.bold.green('seed table'),
    handler: argv => {
      demandOptions(['environment', 'function'], argv)
      env['NODE_ENV'] = argv.environment
      exec(`node functions/${argv.function}/seeders/${argv.function}`)
    },
  })
  .command({
    command: 'reset',
    desc: chalk.bold.red('reset table (delete-build-seed)'),
    handler: argv => {
      demandOptions(['environment', 'function'], argv)
      env['NODE_ENV'] = argv.environment
      env['FN_NAME'] = argv.function
      exec(`node scripts/db/delete-table`, { async: true })
      exec(`node functions/${argv.function}/seeders/${argv.function}`, { async: true })
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
