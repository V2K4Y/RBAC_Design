import React, { useState } from 'react';
import api from '../services/api';

const CreateEntitiesPage: React.FC = () => {
  const [entityType, setEntityType] = useState<'module' | 'action' | 'role'>('module');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateEntity = async () => {
    try {
      if (!name) {
        setErrorMessage('Name is required');
        return;
      }

      let endpoint = '';
      const payload: Record<string, string> = { name };

      switch (entityType) {
        case 'module':
          endpoint = '/modules';
          break;
        case 'action':
          endpoint = '/actions';
          payload.description = description;
          break;
        case 'role':
          endpoint = '/roles';
          payload.description = description;
          break;
        default:
          throw new Error('Invalid entity type');
      }

      await api.post(endpoint, payload);
      setSuccessMessage(`${entityType} created successfully`);
      setName('');
      setDescription('');
      setErrorMessage('');
    } catch (error: any) {
      console.error(error);
      setErrorMessage(error?.response?.data?.message || 'Failed to create entity');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Create New Entity</h1>
      <div className="mb-4">
        <label className="block font-bold mb-2">Entity Type</label>
        <select
          className="w-full p-2 border rounded"
          value={entityType}
          onChange={(e) => setEntityType(e.target.value as 'module' | 'action' | 'role')}
        >
          <option value="module">Module</option>
          <option value="action">Action</option>
          <option value="role">Role</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block font-bold mb-2">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={`Enter ${entityType} name`}
        />
      </div>
      {(entityType === 'action' || entityType === 'role') && (
        <div className="mb-4">
          <label className="block font-bold mb-2">Description</label>
          <textarea
            className="w-full p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Enter ${entityType} description (optional)`}
          ></textarea>
        </div>
      )}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
      <button
        onClick={handleCreateEntity}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create {entityType.charAt(0).toUpperCase() + entityType.slice(1)}
      </button>
    </div>
  );
};

export default CreateEntitiesPage;
