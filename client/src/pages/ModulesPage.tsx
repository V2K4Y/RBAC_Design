import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Module, Action } from '../types';

const ModulesPage: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [actions, setActions] = useState<Action[]>([]);
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedAction, setSelectedAction] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesRes, actionsRes] = await Promise.all([
          api.get<{ data: Module[] }>('/modules'),
          api.get<{ data: Action[] }>('/actions'),
        ]);
        setModules(modulesRes.data.data);
        setActions(actionsRes.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
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
      <h1 className="text-2xl font-bold mb-4">Modules</h1>
      <div className="grid grid-cols-2 gap-4">
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
        onClick={assignActionToModule}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Assign Action to Module
      </button>
    </div>
  );
};

export default ModulesPage;
