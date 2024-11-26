import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { apiResponse } from '../utils/responseHandler';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const result = await authService.signUpUser(username, email, password);
    res.status(201).json(apiResponse('success', 'User signed up successfully', result));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    res.status(200).json(apiResponse('success', 'User logged in successfully', result));
  } catch (error) {
    res.status(401).json(apiResponse('error', (error as any).message));
  }
};
