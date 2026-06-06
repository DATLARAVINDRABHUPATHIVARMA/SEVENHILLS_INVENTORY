import React from 'react'
import { FaBox, FaCog, FaHome, FaLocationArrow, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', path: '/admin-dashboard', icon:<FaHome /> },
    { name: 'Categories', path: '/admin-dashboard/categories', icon:<FaTable /> },
    { name: 'Products', path: '/admin-dashboard/products', icon:<FaBox /> },
    { name: 'Suppliers', path: '/admin-dashboard/suppliers', icon:<FaTruck /> },
    { name: 'Orders', path: '/admin-dashboard/orders', icon:<FaShoppingCart /> },
    { name: 'Users', path: '/admin-dashboard/users', icon:<FaUsers /> },
    { name: 'Profile', path: '/admin-dashboard/profile', icon:<FaCog /> },
    { name: 'Logout', path: '/admin-dashboard/logout', icon:<FaSignOutAlt /> },
  ];
  return (
    <div className='flex flex-col h-screen bg-black text-white w-16 md:w-64 fixed'>
      <div className="h-16 flex flex-items justify-center">
        <span className='hidden md:block text-xl font-bold'>Seven Hills Inventory Store</span>
        <span className='md:hidden text-xl font-bold'>SH Store</span>
      </div>
      <div>
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => {
            <li key={item.name} className={({ isActive }) => ( isActive ? )}>
              <NavLink >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          })}
        </ul>
      </div>
    </div>
  ) 
}

export default Sidebar