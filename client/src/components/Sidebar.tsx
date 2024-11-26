import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to login page after logout
  };

  return (
    <div className="fixed top-0 left-0 w-64 bg-gray-800 text-white h-full">
      <div className="p-6 font-bold text-xl cursor-pointer mb-3" onClick={() => navigate('/')}>RBAC Dashboard</div>
      <nav className="flex flex-col gap-2 flex-grow">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'block px-4 py-2 bg-gray-700' : 'block px-4 py-2 hover:bg-gray-700'
          }
        >
          Dashboard
        </NavLink>
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
      </nav>
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
