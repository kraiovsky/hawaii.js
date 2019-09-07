const { test } = require('shelljs')

module.exports = file => test('-e', file)
