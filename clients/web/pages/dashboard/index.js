import React from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import { ROLES } from '../../constants'

const Dashboard = () => {
  return (
    <ProtectedRoute scope={ROLES.USER}>
      <h2>Dashboard</h2>
    </ProtectedRoute>
  )
}

export default Dashboard
