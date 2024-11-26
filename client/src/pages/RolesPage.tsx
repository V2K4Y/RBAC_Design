import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Role, Module, Action } from '../types';

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [rolesRes, modulesRes, actionsRes] = await Promise.all([
          api.get<{ data: Role[] }>('/roles'),
          api.get<{ data: Module[] }>('/modules'),
          api.get<{ data: Action[] }>('/actions'),
        ]);
        setRoles(rolesRes.data.data);
        setModules(modulesRes.data.data);
        setActions(actionsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const assignModuleActionToRole = async () => {
    if (!selectedRole || !selectedModule || !selectedAction) {
      alert('Please select a role, module, and action');
      return;
    }

    try {
      await api.post('/module-actions-role/assign', {
        roleId: selectedRole,
        moduleActionId: selectedAction, // Assuming you have moduleAction IDs pre-generated
      });
      alert('Module Action assigned to Role successfully');
    } catch (error) {
      console.error('Error assigning Module Action to Role:', error);
      alert('Failed to assign Module Action to Role');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-10">Assign Module related actions for Roles</h1>
      <div className="grid grid-cols-3 gap-4">
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
        <div>
          <h2 className="text-xl font-bold mb-2">Modules</h2>
          <select
            className="w-full p-2 border rounded"
            value={selectedModule || ''}
            onChange={(e) => setSelectedModule(Number(e.target.value))}
          >
            <option value="">Select Module</option>
            {modules.map((module) => (
              <option key={module.id} value={module.id}>
                {module.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Actions</h2>
          <select
            className="w-full p-2 border rounded"
            value={selectedAction || ''}
            onChange={(e) => setSelectedAction(Number(e.target.value))}
          >
            <option value="">Select Action</option>
            {actions.map((action) => (
              <option key={action.id} value={action.id}>
                {action.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={assignModuleActionToRole}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Assign Module Action to Role
      </button>
    </div>
  );
};

export default RolesPage;
