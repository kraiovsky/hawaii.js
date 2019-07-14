const capitalize = require('./capitalize')

module.exports = ({ table, function: fn, environment }) => {
  const modelNameCapitalized = capitalize(table)
  const modelNameLowercased = table.toLowerCase()

  const tableNameKey = `db${modelNameCapitalized}TableName`
  const tableNameValue = `${fn}-${modelNameLowercased}-${environment}`
  const nodeConfig = JSON.stringify({ [tableNameKey]: tableNameValue })

  return {
    modelNameCapitalized,
    modelNameLowercased,
    tableNameValue,
    nodeConfig,
  }
}
