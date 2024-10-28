import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import styles from './css/DashboardLayout.module.css'

const DashboardLayout = () => {
  return (
    <div className={styles.dashboard_layout}>
      <Navbar />
        <div className="dashboard-content">
          <Outlet />
        </div>
    </div>
  )
}

export default DashboardLayout
