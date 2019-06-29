import React from 'react'
import renderer from 'react-test-renderer'
import AuthForm from '../AuthForm'

const onSubmit = jest.fn()

test('Render AuthForm form', () => {
  const component = renderer.create(<AuthForm onSubmit={onSubmit} />)
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
