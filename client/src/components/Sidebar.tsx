import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-screen flex flex-col">
      <div className="p-6 font-bold text-xl">RBAC Dashboard</div>
      <nav className="flex-grow">
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
