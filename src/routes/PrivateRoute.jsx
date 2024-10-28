// src/components/PrivateRoute.js
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated } from '../utils/auth'
import Loading from '../components/Loading'

const PrivateRoute = () => {
  const [auth, setAuth] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated()
      setAuth(result)
      setLoading(false)
    }

    checkAuth()
  }, [])
  console.log(auth)
  if (loading) {
    return <Loading/>;
  }
  return auth ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
