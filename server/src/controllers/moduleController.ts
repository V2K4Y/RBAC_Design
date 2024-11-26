import { Request, Response } from 'express';
import * as moduleService from '../services/moduleService';
import { apiResponse } from '../utils/responseHandler';

export const createModuleController = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const module = await moduleService.createModule(name);
    res.status(201).json(apiResponse('success', 'Module created successfully', module));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const getAllModulesController = async (req: Request, res: Response) => {
  try {
    const modules = await moduleService.getAllModules();
    res.status(200).json(apiResponse('success', 'Modules retrieved successfully', modules));
  } catch (error) {
    res.status(500).json(apiResponse('error', 'Error retrieving modules', (error as any).message));
  }
};

export const updateModuleController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const module = await moduleService.updateModule(parseInt(id), name);
    res.status(200).json(apiResponse('success', 'Module updated successfully', module));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const deleteModuleController = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const module = await moduleService.deleteModule(parseInt(id));
    res.status(200).json(apiResponse('success', 'Module deleted successfully', module));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};
