import React from 'react'
import renderer from 'react-test-renderer'
import AuthNav from '../AuthNav'

test('Render AuthNav', () => {
  const component = renderer.create(<AuthNav />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
