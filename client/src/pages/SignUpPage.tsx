import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import { SignUpFormData } from '../types';
import { useAuth } from '../context/AuthContext';

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();

  const [formData, setFormData] = useState<SignUpFormData>({
    username: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('Please fill all fields');
      return;
    }

    try {
      const response = await signup(formData.username, formData.email, formData.password);

      // If user doesn't have a role, redirect them to the home page
      if (!response.data.user.roles) {
        navigate('/');  // Redirect to the home page after successful sign-up
      } else {
        const roles = response.data.data?.roles;

        // Save user role for protected routes
        localStorage.setItem('role', JSON.stringify(roles));

        setIsAuthenticated(true);
        navigate('/'); // Redirect to dashboard if the user has a role
      }
    } catch (error: any) {
      console.log("Some error: ", error)
      setErrorMessage(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded">
            Sign Up
          </button>
        </form>

        {/* Switch to Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
