const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, cd } = require('shelljs')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

const generateEnvFileCmd = 'sls env generate'

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('Execution CLI.'))
  .middleware([])
  .option('function', {
    alias: 'f',
    demandOption: true,
    describe: chalk.yellow('function to run'),
    type: 'string',
  })
  .command({
    command: 'dev',
    desc: chalk.bold.green('start development server'),
    builder: yargs => {
      yargs
        .positional('--debug', {
          describe: chalk.yellow('run in debug mode'),
          type: 'boolean',
          alias: '-d',
          coerce: () => ':debug',
        })
        .positional('--generate', {
          describe: chalk.yellow('skip generation of .env'),
          type: 'boolean',
          alias: '-g',
        })
    },
    handler: argv => {
      let cmd = 'yarn start:server'
      if (argv.debug) cmd += ':debug'
      cd(`functions/${argv.function}`)
      if (argv.generate) exec(generateEnvFileCmd)
      exec(cmd)
    },
  })
  .command({
    command: 'sls',
    desc: chalk.bold.green('start serverless offline'),
    builder: yargs => {
      yargs.positional('--generate', {
        describe: chalk.yellow('skip generation of .env'),
        type: 'boolean',
        alias: '-g',
      })
    },
    handler: argv => {
      cd(`functions/${argv.function}`)
      if (argv.generate) exec(generateEnvFileCmd)
      exec(`yarn start:sls`)
    },
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
