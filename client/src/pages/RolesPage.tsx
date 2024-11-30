import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Role, ModuleAction } from '../types';

const RolesPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modules, setModules] = useState<ModuleAction[]>([]);
  const [roleModuleActions, setRoleModuleActions] = useState<any[]>([]); // For roles and their module-actions
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [rolesRes, modulesRes, roleModuleActionsRes] = await Promise.all([
          api.get<{ data: Role[] }>('/roles'),
          api.get<{ data: ModuleAction[] }>('/module-actions'),
          api.get<{ data: any[] }>('/module-actions-role'),
        ]);
        setRoles(rolesRes.data.data);
        setModules(modulesRes.data.data);
        setRoleModuleActions(roleModuleActionsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Handle assignment of selected module-action to a role
  const assignModuleActionToRole = async () => {
    if (!selectedRole || !selectedModule || !selectedAction) {
      alert('Please select a role, module, and action');
      return;
    }

    try {
      setLoading(true);
      await api.post('/module-actions-role/assign', {
        roleId: selectedRole,
        moduleActionId: selectedAction, // Send the moduleActionId in the request
      });
      alert('Module Action assigned to Role successfully');
    } catch (error) {
      console.error('Error assigning Module Action to Role:', error);
      alert('Failed to assign Module Action to Role');
    }
    setLoading(false);
  };

  // Get actions for the selected module
  const filteredActions = selectedModule
    ? modules.find((module) => module.id === selectedModule)?.moduleActions || []
    : [];

  return (
    !loading ? <div className="p-6">
      <h1 className="text-2xl font-bold mb-10">Assign Module Related Actions for Roles</h1>
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
            {filteredActions.map((action: any) => (
              <option key={action.moduleActionId} value={action.moduleActionId}>
                {action.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={assignModuleActionToRole}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        disabled = {loading}
      >
        Assign Module Action to Role
      </button>

      {/* Display Role-Module-Action Details */}
      <h2 className="text-2xl font-bold mt-10 mb-6">Roles and Associated Module Actions</h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse border border-gray-200 w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2">Role Name</th>
              <th className="border border-gray-300 px-4 py-2">Module</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roleModuleActions.map((role) =>
              role.moduleAction.map((moduleAction: any, index: number) => (
                <tr key={`${role.id}-${index}`} className="hover:bg-gray-50">
                  {/* Display Role Name only once for each role */}
                  {index === 0 ? (
                    <td
                      className="border border-gray-300 px-4 py-2"
                      rowSpan={role.moduleAction.length}
                    >
                      {role.roleName}
                    </td>
                  ) : null}
                  <td className="border border-gray-300 px-4 py-2">{moduleAction.module}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {moduleAction.action.join(', ')}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div> : <div className='h-screen flex justify-center items-center'>
      Loading...
    </div>
  );
};

export default RolesPage;
