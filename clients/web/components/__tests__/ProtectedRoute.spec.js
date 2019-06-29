import React from 'react'
import renderer from 'react-test-renderer'
import { useSelector } from 'react-redux'
import initialState from '../../store/initialState'
import ProtectedRoute from '../ProtectedRoute'

jest.mock('react-redux')
const scope = ['admin']
const children = <>Protected Route Content</>

describe('Render ProtectedRoute', () => {
  test('👎 Unauthenticated user', () => {
    useSelector.mockImplementation(() => ({
      ...initialState,
      isFinished: {
        auth: true,
      },
    }))
    const component = renderer.create(<ProtectedRoute scope={scope} children={children} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('👎 Authenticated but not authorized user', () => {
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
    const component = renderer.create(<ProtectedRoute scope={scope} children={children} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  test('👍 Authenticated and authorized user', () => {
    useSelector.mockImplementation(() => ({
      ...initialState,
      isFinished: {
        auth: true,
      },
      auth: {
        access_token: 'some-access-token',
        refresh_token: 'some-refresh-token',
        scope: 'admin',
        uid: '123-user',
        email: 'user@email.com',
      },
    }))
    const component = renderer.create(<ProtectedRoute scope={scope} children={children} />)
    let tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
