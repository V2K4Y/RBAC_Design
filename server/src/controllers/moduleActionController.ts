import { Request, Response } from 'express';
import * as moduleActionService from '../services/moduleActionService';
import { apiResponse } from '../utils/responseHandler';

// Assign Action to Module
export const assignActionToModuleController = async (req: Request, res: Response) => {
  const { moduleId, actionId } = req.body;

  try {
    const moduleAction = await moduleActionService.assignActionToModule(moduleId, actionId);
    res.status(201).json(apiResponse('success', 'Action assigned to module successfully', moduleAction));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

// Get Actions for Module
export const getActionsForModuleController = async (req: Request, res: Response) => {
  const { moduleId } = req.params;

  try {
    const actions = await moduleActionService.getActionsForModule(parseInt(moduleId));
    res.status(200).json(apiResponse('success', 'Actions for module retrieved successfully', actions));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving actions for module', (error as any).message));
  }
};
