const yargonaut = require('yargonaut')
const yargs = require('yargs')
const { exec, cd } = require('shelljs')

yargonaut.style('cyan').errorsStyle('red')
const chalk = yargonaut.chalk()

const prepareDocs = () => {
  exec('node cli/scripts/docs/cleanup')
  exec('node cli/scripts/docs/copy-fns')
  exec('node cli/scripts/docs/copy-libs')
  exec('node cli/scripts/docs/copy-readme')
  exec('node cli/scripts/docs/build-sidebars')
}

/* eslint-disable no-unused-expressions */
yargs
  .usage(chalk.yellow.bold('Documentation CLI.'))
  .middleware([])
  .option('prepare', {
    alias: 'p',
    describe: chalk.yellow('prepare docs first'),
    type: 'boolean',
  })
  .command({
    command: 'prepare',
    desc: chalk.bold.green('prepare Docusaurus file structure'),
    handler: argv => prepareDocs(),
  })
  .command({
    command: 'run',
    desc: chalk.bold.green('start local Docusaurus website'),
    handler: argv => {
      if (argv.prepare) prepareDocs()
      cd('website')
      exec('yarn start')
    },
  })
  .command({
    command: 'build',
    desc: chalk.bold.green('build documentation for publishing'),
    handler: argv => {
      if (argv.prepare) prepareDocs()
      cd('website')
      exec('yarn build')
    },
  })
  .demandCommand()
  .showHelpOnFail(true)
  .help()
  .alias('h', 'help')
  .wrap(null).argv
