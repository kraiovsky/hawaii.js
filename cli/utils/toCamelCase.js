const capitalize = require('./capitalize')

module.exports = str =>
  str
    .split(/[-_]/g)
    .map(w => capitalize(w))
    .join('')
