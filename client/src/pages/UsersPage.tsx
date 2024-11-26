import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { User, Role } from '../types';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, rolesRes] = await Promise.all([
          api.get<{ data: User[] }>('/users'),
          api.get<{ data: Role[] }>('/roles'),
        ]);
        console.log(usersRes.data, '\n', rolesRes.data.data)
        setUsers(usersRes.data as any);
        setRoles(rolesRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const assignRoleToUser = async () => {
    if (!selectedUser || !selectedRole) {
      alert('Please select both a user and a role');
      return;
    }

    try {
      await api.post('/user-roles/assign', {
        userId: selectedUser,
        roleId: selectedRole,
      });
      alert('Role assigned to user successfully');
    } catch (error) {
      console.error('Error assigning role to user:', error);
      alert('Failed to assign role to user');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-bold mb-2">Users</h2>
          <select
            className="w-full p-2 border rounded"
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option value="">Select User</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Roles</h2>
          <select
            className="w-full p-2 border rounded"
            value={selectedRole || ''}
            onChange={(e) => setSelectedRole(Number(e.target.value))}
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
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
      >
        Assign Role to User
      </button>
    </div>
  );
};

export default UsersPage;
