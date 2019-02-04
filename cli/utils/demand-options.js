const yargonaut = require('yargonaut')
const { echo } = require('shelljs')
const errorHandler = require('./error-handler')

const chalk = yargonaut.chalk()

module.exports = (required = [], provided = {}) => {
  const errors = []
  required.forEach(arg => {
    if (!provided[arg]) errors.push(arg)
  })
  if (errors.length > 0) {
    echo(chalk.red('Error - the following arguments are required:'))
    errorHandler(errors)
  }
}
