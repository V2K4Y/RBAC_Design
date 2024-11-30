import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Action, ModuleAction } from '../types';

const ModulesPage: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [actions, setActions] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  // Fetch modules and actions data
  useEffect(() => {
    const fetchModulesWithActions = async () => {
      try {
        // Fetch modules and actions from APIs
        const [modulesRes, actionsRes] = await Promise.all([
          api.get<{ data: ModuleAction[] }>('/module-actions'),
          api.get<{ data: Action[] }>('/actions'),
        ]);
        setModules(modulesRes.data.data);
        setActions(actionsRes.data.data);
      } catch (error) {
        console.error('Error fetching modules and actions:', error);
      }
    };

    fetchModulesWithActions();
  }, []);

  // Assign action to a module
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
      // Refresh modules data after assignment
      const response = await api.get<{ data: any[] }>('/module-actions');
      setModules(response.data.data);
    } catch (error) {
      console.error('Error assigning action to module:', error);
      alert('Failed to assign action to module');
    }
  };

  // Filter actions not yet associated with the selected module
  const filteredActions = selectedModule
    ? actions.filter((action) =>
        !modules
          .find((module) => module.id === selectedModule)
          ?.moduleActions.some((moduleAction: any) => moduleAction.id === action.id)
      )
    : actions;

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
            {filteredActions.map((action: any) => (
              <option key={action.id} value={action.id}>
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

      {/* Modules and Actions Display */}
      <h1 className="text-xl font-bold mb-5 mt-16">Modules and Their Actions</h1>
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
