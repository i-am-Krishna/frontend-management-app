import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard/Dashboard'

import Login from '../pages/login/Login'
import Signup from '../pages/signup/Signup'
import DashboardLayout from '../components/dashboardLayout/DashboardLayout'
import Analytics from '../pages/analytics/Analytics'
import SharedTask from '../pages/sharedTask/SharedTask'
import PrivateRoute from './PrivateRoute'
import Settings from '../pages/settings/Settings'
import PageNotFound from '../pages/pageNotFound/PageNotFound'


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
