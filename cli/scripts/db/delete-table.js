const handleErr = require('../utils/error-handler')

const deleteTable = async () => {
  const Model = require(`../../functions/${process.env.FN_NAME}/src/models/${process.env.FN_NAME}`)
  try {
    await Model.deleteTable()
    console.log(`💣 ${process.env.FN_NAME} table destroyed.`)
  } catch (err) {
    handleErr(err)
  }
}
deleteTable()
