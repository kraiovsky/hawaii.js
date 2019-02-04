const serializeFields = require('../lib/query-fields-serializer')
const testCases = require('./query-fields-serializer.cases')

let fieldsArr

describe('serializeFields()', () => {
  describe.each(testCases.serializeFields.happy)('', (fields, expected) => {
    beforeEach(() => {
      fieldsArr = serializeFields(fields)
    })

    test(`👍 should return ${expected}`, () => {
      expect(fieldsArr).toMatchSnapshot()
    })
  })
})
