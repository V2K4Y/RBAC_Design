import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[]; // Array of roles allowed to access the route
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const storedRoles = localStorage.getItem('role');
  const { isAuthenticated } = useAuth();
  const roles: string[] = storedRoles ? JSON.parse(storedRoles) : []; // Parse stored roles

  // If no token or the roles do not match any of the allowedRoles, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  } else if (!roles.some((role: string) => allowedRoles.includes(role))) {
    console.log('Came to check role access')
    return <Navigate to="/unauthorized" state={{ from: {pathname: location.pathname, search: location.search} }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
