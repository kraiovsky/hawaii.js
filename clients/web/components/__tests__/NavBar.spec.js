import React from 'react'
import renderer from 'react-test-renderer'
import { useSelector } from 'react-redux'
import initialState from '../../store/initialState'
import NavBar from '../NavBar'

jest.mock('react-redux')

describe('Render NavBar', () => {
  test('Auth init in progress', () => {
    useSelector.mockImplementation(() => initialState)
    const component = renderer.create(<NavBar />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('👎 Auth init finished - unauthenticated user', () => {
    useSelector.mockImplementation(() => ({
      ...initialState,
      isFinished: {
        auth: true,
      },
    }))
    const component = renderer.create(<NavBar />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('👍 Auth init finished - authenticated user', () => {
    useSelector.mockImplementation(() => ({
      ...initialState,
      isFinished: {
        auth: true,
      },
      auth: {
        access_token: 'some-access-token',
        refresh_token: 'some-refresh-token',
        scope: 'super-user',
        uid: '123-user',
        email: 'user@email.com',
      },
    }))
    const component = renderer.create(<NavBar />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
