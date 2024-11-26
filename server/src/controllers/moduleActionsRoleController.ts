import { Request, Response } from 'express';
import * as moduleActionRoles from '../services/moduleActionsRoleService';
import { apiResponse } from '../utils/responseHandler';

// Assign a ModuleAction to a Role
export const assignModuleActionToRoleController = async (req: Request, res: Response) => {
  const { roleId, moduleActionId } = req.body;

  try {
    const mapping = await moduleActionRoles.assignModuleActionToRole(roleId, moduleActionId);
    res.status(201).json(apiResponse('success', 'ModuleAction assigned to role successfully', mapping));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

// Get ModuleActions for a Role
export const getModuleActionsForRoleController = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    const moduleActions = await moduleActionRoles.getModuleActionsForRole(parseInt(roleId));
    res.status(200).json(apiResponse('success', 'ModuleActions for role retrieved successfully', moduleActions));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving ModuleActions for role', (error as any).message));
  }
};

// Get Roles for a ModuleAction
export const getRolesForModuleActionController = async (req: Request, res: Response) => {
  const { moduleActionId } = req.params;

  try {
    const roles = await moduleActionRoles.getRolesForModuleAction(parseInt(moduleActionId));
    res.status(200).json(apiResponse('success', 'Roles for ModuleAction retrieved successfully', roles));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving Roles for ModuleAction', (error as any).message));
  }
};

// Delete a Role-to-ModuleAction Mapping
export const deleteModuleActionRoleMappingController = async (req: Request, res: Response) => {
  const { roleId, moduleActionId } = req.body;

  try {
    const deletedMapping = await moduleActionRoles.deleteModuleActionRoleMapping(roleId, moduleActionId);
    res.status(200).json(apiResponse('success', 'Role-to-ModuleAction mapping deleted successfully', deletedMapping));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};
