import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { User, Role } from '../types';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [usersRes, rolesRes] = await Promise.all([
          api.get<User[]>('/users'),
          api.get<{data: Role []}>('/roles')
        ]);
        setUsers(usersRes.data);
        setRoles(rolesRes.data.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const assignRoleToUser = async () => {
    if (!selectedUser || !selectedRole) {
      alert('Please select both a user and a role');
      return;
    }

    try {
      setLoading(true);
      await api.post('/user-roles/assign', {
        userId: selectedUser,
        roleId: selectedRole,
      });
      alert('Role assigned to user successfully');
    } catch (error) {
      console.error('Error assigning role to user:', error);
      alert('Failed to assign role to user');
    }
    setLoading(false);
  };

  const filteredRoles = selectedUser ? roles.filter((role) => {
    return !users.find((user) => user.id === selectedUser)?.roles.includes(role.name)
  }): roles;

  return (
    !loading ? <div className="p-6">

      {/* Role Assignment Section */}
      <h2 className="text-xl font-bold mt-10 mb-4">Assign Roles to Users</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Select User</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option value="">Choose User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Select Role</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedRole || ''}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
          >
            <option value="">Choose Role</option>
            {filteredRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={assignRoleToUser}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled={loading}
      >
        Assign Role
      </button>

      <h1 className="text-2xl font-bold mb-6 mt-16">User Details & Role Assignment</h1>

      {/* User Details Section */}
      <h2 className="text-xl font-bold mb-4">User List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Roles</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id}>
              <td className="border border-gray-300 px-4 py-2">{user.id}</td>
              <td className="border border-gray-300 px-4 py-2">{user.username}</td>
              <td className="border border-gray-300 px-4 py-2">{user.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {user.roles.join(', ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>: <div className='h-screen flex justify-center items-center'>
      Loading...
    </div>
  );
};

export default UsersPage;
