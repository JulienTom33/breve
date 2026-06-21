import { FC } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute: FC = () => {
  // Placeholder : sera remplacé par Supabase Auth
  const isAuthenticated = !!localStorage.getItem('auth')
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />
}

export default ProtectedRoute
