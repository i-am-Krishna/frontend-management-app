import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'

import Login from '../pages/Login'
import Signup from '../pages/Signup'
import DashboardLayout from '../components/DashboardLayout'
import Analytics from '../pages/Analytics'
import SharedTask from '../pages/SharedTask'
import PrivateRoute from './PrivateRoute'
import Settings from '../pages/Settings'
import PageNotFound from '../pages/PageNotFound'


const MainRoutes = () => {
  return (
    <Routes>
      {/* Routes with Sidebar and Navbar */}
      <Route element={<PrivateRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path='/' element={<Dashboard />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/settings' element={<Settings/>} />
      </Route>
      </Route>

      {/* Routes without authentication */}
      <Route path='/share/:id' element={<SharedTask />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="*" element={<PageNotFound />} />

    </Routes>
  )
}

export default MainRoutes
