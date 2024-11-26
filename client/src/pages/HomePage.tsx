import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Handle login or signup redirection
  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-xl p-8 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-3xl font-bold text-blue-600 mb-4">Welcome to Our System</h2>
        <p className="text-gray-700 mb-6">
          This system helps manage your roles, modules, and permissions with a role-based access control (RBAC) system.
          Secure your platform with customizable roles for different users, such as Admin, Editor, and Viewer.
        </p>
        
        {/* Call to Action for Users to Log In or Sign Up */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleLogin}
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
          <button
            onClick={handleSignUp}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Information Section */}
        <div className="mt-8 text-sm text-gray-600">
          <p>RBAC gives you the flexibility to create users with different permissions to manage your platform efficiently.</p>
          <p className="mt-2">Secure, simple, and customizable access management.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
