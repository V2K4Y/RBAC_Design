import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import ModulesPage from './pages/ModulesPage';
import RolesPage from './pages/RolesPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './components/ProtectedRoute';
import UnauthorizedPage from './pages/UnauthorizedPage';
import HomePage from './pages/HomePage';
import { useAuth } from './context/AuthContext'; // Import context
import LandingPage from './pages/LandingPage';
import CreateEntitiesPage from './pages/CreateEntitiesPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Access the auth state from context

  return (
      <Router>
        <div className="flex">
          {/* Conditionally render the Sidebar based on authentication */}
          {isAuthenticated && <Sidebar />}
          <div className={`flex-grow p-6 bg-gray-100 ${isAuthenticated ? 'ml-64' : null}`}>
            <Routes>
              {/* Public Routes */}
              {!isAuthenticated && <Route path="/" element={<HomePage />} />}
              {isAuthenticated && <Route path="/" element={<LandingPage />} />}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/unauthorized" element={<UnauthorizedPage />} />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['Admin', 'Editor', 'User']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/modules"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <ModulesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/roles"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <RolesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-entity"
                element={
                  <ProtectedRoute allowedRoles={['Admin']}>
                    <CreateEntitiesPage />
                  </ProtectedRoute>
                }
              />

              {/* Redirect to login if no token is found */}
              <Route path="*" element={isAuthenticated ? <Dashboard /> : <LoginPage />} />
            </Routes>
          </div>
        </div>
      </Router>
  );
};

export default App;
