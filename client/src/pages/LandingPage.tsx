import React from 'react';

const LandingPage: React.FC = () => {

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 max-h-screen">
      <div className="w-full max-w-4xl p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Welcome to Our RBAC System</h1>
        <p className="text-lg text-gray-700 mb-8">
          Our Role-Based Access Control (RBAC) system helps you manage user roles and permissions with ease.
          Ensure your platform’s security by assigning roles to users based on their responsibilities.
        </p>

        {/* RBAC Description */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">How RBAC Works</h2>
          <p className="text-gray-600 mb-4">
            In a typical RBAC system, users are assigned specific roles that grant them access to certain resources and actions.
          </p>
          <p className="text-gray-600 mb-4">
            Roles such as "Admin", "Editor", and "Viewer" allow you to control who can perform specific actions (like creating, editing, or viewing content) on your platform.
          </p>
          <p className="text-gray-600 mb-4">
            You can easily manage these roles, assign permissions, and ensure that users only have access to what they need.
          </p>
        </div>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Key Features</h2>
          <ul className="text-left space-y-2 text-gray-600">
            <li>✔ Secure access control by defining roles and permissions.</li>
            <li>✔ Easily assign roles to users and manage their permissions.</li>
            <li>✔ Prevent unauthorized access to sensitive resources.</li>
            <li>✔ Simplified role management for better scalability.</li>
          </ul>
        </div>
        <div className="mt-8 text-sm text-gray-600">
          <p>RBAC gives you the flexibility to define and manage roles across your application.</p>
          <p className="mt-2">Assign roles such as Admin, Editor, Viewer, and more to ensure only authorized users have access to sensitive areas of the application.</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
