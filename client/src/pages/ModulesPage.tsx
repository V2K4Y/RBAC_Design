import React, { useState, useEffect } from 'react';
import api from '../services/api';

const ModulesPage: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  // Fetch modules and their actions
  useEffect(() => {
    const fetchModulesWithActions = async () => {
      try {
        const response = await api.get<{ data: any[] }>('/module-actions');
        setModules(response.data.data);
      } catch (error) {
        console.error('Error fetching modules with actions:', error);
      }
    };

    fetchModulesWithActions();
  }, []);

  const assignActionToModule = async () => {
    if (!selectedModule || !selectedAction) {
      alert('Please select both a module and an action');
      return;
    }

    try {
      await api.post('/module-actions/assign', {
        moduleId: selectedModule,
        actionId: selectedAction,
      });
      alert('Action assigned to module successfully');
    } catch (error) {
      console.error('Error assigning action to module:', error);
      alert('Failed to assign action to module');
    }
  };

  return (
    <div className="p-6">

      {/* Assign Actions to Modules */}
      <h2 className="text-xl font-bold mt-10 mb-4">Assign Actions to Modules</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Modules</h3>
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
          <h3 className="text-lg font-semibold mb-2">Actions</h3>
          <select
            className="w-full p-2 border rounded"
            value={selectedAction || ''}
            onChange={(e) => setSelectedAction(Number(e.target.value))}
          >
            <option value="">Select Action</option>
            {/* Populate actions from all modules */}
            {modules
              .flatMap((module) => module.moduleActions)
              .map((action: any) => (
                <option key={action.moduleActionId} value={action.moduleActionId}>
                  {action.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <button
        onClick={assignActionToModule}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Assign Action to Module
      </button>

      <h1 className="text-xl font-bold mb-5 mt-16">Modules and Their Actions</h1>

      {/* Modules and Actions Display */}
      <div className="rounded p-4">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Module Name</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {modules.map((module) => (
              <tr key={module.id}>
                <td className="border border-gray-300 px-4 py-2">{module.name}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {module.moduleActions.map((action: any) => action.name).join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModulesPage;
