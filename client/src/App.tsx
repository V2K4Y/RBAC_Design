import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModulesPage from './pages/ModulesPage';
import RolesPage from './pages/RolesPage';
import UsersPage from './pages/UsersPage';
// import ProtectedRoute from './components/ProtectedRoute';
import CreateEntitiesPage from './pages/CreateEntitiesPage';

// App Component
const App: React.FC = () => {
  // Simulated user role (this should come from your authentication logic)
  // const userRole = localStorage.getItem('role'); // "Admin", "Editor", etc.

  return (
    <Router>
      <div className="flex">
        {/* Sidebar for navigation */}
        <Sidebar />
        <div className="flex-grow p-6 bg-gray-100">
          <Routes>
            {/* Dashboard Route (Accessible to all authenticated users) */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Modules Route (Protected for Admins) */}
            <Route
              path="/modules"
              element={
                // <ProtectedRoute allowedRoles={['Admin']} userRole={userRole}>
                  <ModulesPage />
                // </ProtectedRoute>
              }
            />
            <Route
              path='/create-entities'
              element={
                // <ProtectedRoute allowedRoles={['Admin']} userRole={userRole}>
                  <CreateEntitiesPage />
                // </ProtectedRoute>
              } 
            />

            {/* Roles Route (Protected for Admins) */}
            <Route
              path="/roles"
              element={
                // <ProtectedRoute allowedRoles={['Admin']} userRole={userRole}>
                  <RolesPage />
                // </ProtectedRoute>
              }
            />

            {/* Users Route (Protected for Admins) */}
            <Route
              path="/users"
              element={
                // <ProtectedRoute allowedRoles={['Admin']} userRole={userRole}>
                  <UsersPage />
                // </ProtectedRoute>
              }
            />

            {/* Redirect to Dashboard if route not found */}
            <Route path="*" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
