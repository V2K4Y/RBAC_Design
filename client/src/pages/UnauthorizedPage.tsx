import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/');
    }
  })
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
        <p className="mb-4 text-gray-600">
          You do not have permission to view this page.
        </p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
