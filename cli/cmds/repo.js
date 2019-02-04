const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, rm } = require('shelljs')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('Repository tools CLI.'))
  .middleware([])
  .command({
    command: 'clean-sls',
    desc: chalk.bold.green('clean-up serverless distribution artifacts'),
    handler: argv => {
      rm('-rf', 'functions/*/dist')
      rm('-rf', 'functions/*/.serverless')
    },
  })
  .command({
    command: 'clean-modules',
    desc: chalk.bold.green('clean-up node modules'),
    handler: argv => {
      rm('-rf', 'node_modules')
      rm('-rf', '*/**/node_modules')
      rm('-rf', 'shrinkwrap.yaml')
      rm('-rf', '*/**/shrinkwrap.yaml')
    },
  })
  .command({
    command: 'prettify',
    desc: chalk.bold.green('prettify repository'),
    handler: argv => {
      exec(`prettier --write '**/*.js'`)
    },
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
