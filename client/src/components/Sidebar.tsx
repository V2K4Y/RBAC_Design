import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 h-screen text-white">
      <div className="p-6 font-bold text-xl">RBAC Dashboard</div>
      <nav className="mt-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? 'block p-4 bg-gray-700' : 'block p-4 hover:bg-gray-700'
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/modules"
          className={({ isActive }) =>
            isActive ? 'block p-4 bg-gray-700' : 'block p-4 hover:bg-gray-700'
          }
        >
          Modules
        </NavLink>
        <NavLink
          to="/roles"
          className={({ isActive }) =>
            isActive ? 'block p-4 bg-gray-700' : 'block p-4 hover:bg-gray-700'
          }
        >
          Roles
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? 'block p-4 bg-gray-700' : 'block p-4 hover:bg-gray-700'
          }
        >
          Users
        </NavLink>
        <NavLink
          to="/create-entities"
          className={({ isActive }) =>
            isActive ? 'block p-4 bg-gray-700' : 'block p-4 hover:bg-gray-700'
          }
        >
          Create Entities
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
