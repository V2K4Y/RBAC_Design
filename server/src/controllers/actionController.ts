import { Request, Response } from 'express';
import * as actionService from '../services/actionService';
import { apiResponse } from '../utils/responseHandler';

export const createActionController = async (req: Request, res: Response) => {
  const { name, description } = req.body;

  try {
    const action = await actionService.createAction(name, description);
    res.status(201).json(apiResponse('success', 'Action created successfully', action));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const getAllActionsController = async (req: Request, res: Response) => {
  try {
    const actions = await actionService.getAllActions();
    res.status(200).json(apiResponse('success', 'Actions retrieved successfully', actions));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving actions', (error as any).message));
  }
};

export const updateActionController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const action = await actionService.updateAction(parseInt(id), name, description);
    res.status(200).json(apiResponse('success', 'Action updated successfully', action));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const deleteActionController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const action = await actionService.deleteAction(parseInt(id));
    res.status(200).json(apiResponse('success', 'Action deleted successfully', action));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};
