const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, cd } = require('shelljs')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('Serverless CLI.'))
  .middleware([])
  .option('environment', {
    alias: 'e',
    describe: chalk.yellow('environment'),
    type: 'string',
    choices: ['development', 'production'],
    default: 'development',
  })
  .option('function', {
    alias: 'f',
    demandOption: true,
    describe: chalk.yellow('function'),
    type: 'string',
  })
  .command({
    command: 'generate-env',
    desc: chalk.bold.green('generate env vars from environment.yml'),
    handler: argv => {
      cd(`functions/${argv.function}`)
      exec(`sls env generate -k`)
    },
  })
  .command({
    command: 'package',
    desc: chalk.bold.green('build serverless package'),
    handler: argv => {
      cd(`functions/${argv.function}`)
      exec('rm .env')
      exec(`sls package -s ${argv.environment}`)
    },
  })
  .command({
    command: 'deploy',
    desc: chalk.bold.green('deploy serverless package'),
    handler: argv => {
      cd(`functions/${argv.function}`)
      exec('rm .env')
      exec(`sls deploy -s ${argv.environment}`)
    },
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
