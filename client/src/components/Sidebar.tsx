import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { logout } from '../services/api';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false); // State to toggle dropdown

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    localStorage.removeItem('role');
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full">
      <div
        className="p-6 font-bold text-xl cursor-pointer mb-3"
        onClick={() => navigate('/')}
      >
        RBAC Dashboard
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        {/* Dashboard */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
          }
        >
          Dashboard
        </NavLink>

        {/* Role Management Dropdown */}
        <div>
          <button
            onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
            className="flex gap-3 items-center w-full text-left px-4 py-2 hover:bg-gray-700 focus:outline-none"
          >
            Role Management

              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke-width="1.5" 
                stroke="currentColor" 
                className={`h-5 w-5 transform transition-transform duration-500 ${isRoleDropdownOpen ? '-rotate-180' : 'rotate-0'}`}
              >
              <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>

          </button>
          {isRoleDropdownOpen && (
            <div className="ml-4 mt-2">
              <NavLink
                to="/modules"
                className={({ isActive }) =>
                  isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
                }
              >
                Modules
              </NavLink>
              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
                }
              >
                Roles
              </NavLink>
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
                }
              >
                Users
              </NavLink>
            </div>
          )}
        </div>

        {/* Create Entity */}
        <NavLink
          to="/create-entity"
          className={({ isActive }) =>
            isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
          }
        >
          Create Entity
        </NavLink>
      </nav>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="mt-auto mb-6 px-4 py-2 bg-red-600 text-white rounded absolute bottom-6 left-6 w-48"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
