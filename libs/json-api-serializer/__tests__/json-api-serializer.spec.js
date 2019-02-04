const { Serializer } = require('../')
const {
  queries: { mockFirstRecord },
  fixtures: { mockUsersDB },
} = require('@hypefight/test-helpers')
const mockUserObject = require('../fixtures/userSerializationObject')

const mockUserProfile = mockFirstRecord(mockUsersDB)

describe('Serializer()', () => {
  test('👍 should return serialized user with meta', async () => {
    const res = await Serializer('user', mockUserObject, mockUserProfile, { meta: 'object' })
    expect(res).toMatchSnapshot()
  })

  test('👎 should return empty user and empty meta', async () => {
    const emptyUser = {}
    const res = await Serializer('user', mockUserObject, emptyUser)
    expect(res).toMatchSnapshot()
  })
})
