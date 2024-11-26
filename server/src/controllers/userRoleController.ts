import { Request, Response } from 'express';
import * as userRoleService from '../services/userRoleService';
import { apiResponse } from '../utils/responseHandler';

// Assign a Role to a User
export const assignRoleToUserController = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    const mapping = await userRoleService.assignRoleToUser(userId, roleId);
    res.status(201).json(apiResponse('success', 'Role assigned to user successfully', mapping));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

// Get Roles for a User
export const getRolesForUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const roles = await userRoleService.getRolesForUser(parseInt(userId));
    res.status(200).json(apiResponse('success', 'Roles for user retrieved successfully', roles));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving roles for user', (error as any).message));
  }
};

// Get Users for a Role
export const getUsersForRoleController = async (req: Request, res: Response) => {
  const { roleId } = req.params;

  try {
    const users = await userRoleService.getUsersForRole(parseInt(roleId));
    res.status(200).json(apiResponse('success', 'Users for role retrieved successfully', users));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving users for role', (error as any).message));
  }
};

// Remove a Role from a User
export const removeRoleFromUserController = async (req: Request, res: Response) => {
  const { userId, roleId } = req.body;

  try {
    const removedMapping = await userRoleService.removeRoleFromUser(userId, roleId);
    res.status(200).json(apiResponse('success', 'Role removed from user successfully', removedMapping));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};
