import React from 'react'
import Sidebar from '../Components/Sidebar.jsx'
import { Outlet } from 'react-router'

const Dashboard = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar/>
        <div className="flex-1 ml-16 md:ml-64 bg-gray-100 min-h-screen">
          <Outlet/>
        </div>
        
      </div>
    </div>
  )
}

export default Dashboard