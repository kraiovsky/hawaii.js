const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, cd } = require('shelljs')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('Clients CLI.'))
  .middleware([])
  .command({
    command: 'web <action>',
    desc: chalk.bold.green('start next.js web client'),
    builder: yargs => {
      yargs.positional('<action>', {
        describe: chalk.yellow('action to execute on web client'),
        type: 'string',
        choices: ['dev', 'build', 'start'],
        coerce: action => action,
      })
    },
    handler: argv => {
      let cmd = `yarn ${argv.action}`
      cd(`clients/web`)
      exec(cmd)
    },
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
