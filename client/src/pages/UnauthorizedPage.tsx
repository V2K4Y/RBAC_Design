import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const UnauthorizedPage: React.FC = () => {
    console.log('entere unathorized page')
  const navigate = useNavigate();
  const location = useLocation();

  // Function to go back to the previous page
  const goBack = () => {
    navigate(location.state?.from || '/dashboard'); // Navigate to the previous page or fallback to dashboard
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
        <p className="mb-4 text-gray-600">
          You do not have permission to view this page.
        </p>
        <button
          onClick={goBack}
          className="px-4 py-2 bg-blue-500 text-white rounded mt-4 flex items-center justify-center"
        >
          <span className="mr-2">←</span> Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
