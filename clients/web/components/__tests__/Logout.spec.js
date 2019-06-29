import React from 'react'
import renderer from 'react-test-renderer'
import Logout from '../Logout'

jest.mock('react-redux')

test('Render Logout link for the nav bar', () => {
  const component = renderer.create(<Logout />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
