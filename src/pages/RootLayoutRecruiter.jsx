import React from 'react'
import { Outlet } from 'react-router-dom'
import '../style/RootLayout.css'
import Sidebar from './SidebarRecruiter'

export default function RootLayoutRecruiter() {
  return (
    // <div>
    //   <MainNavigationRecruiter/>
    //   <Outlet/>
    // </div>
    <div className='root-layout'>
          <Sidebar />
          <div className="main-content2">
            <Outlet />
          </div>
        </div>
  )
}
