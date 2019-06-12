import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../store'
import ProtectedRoute from '../../components/ProtectedRoute'
import { ROLES } from '../../constants'

const pageTitle = 'Dashboard'

const Dashboard = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    setPageTitle(pageTitle, dispatch)
  }, [])

  return (
    <ProtectedRoute scope={[ROLES.USER, ROLES.ADMIN]}>
      <h2>Dashboard</h2>
    </ProtectedRoute>
  )
}

export default Dashboard
