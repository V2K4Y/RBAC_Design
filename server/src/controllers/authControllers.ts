import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { apiResponse } from '../utils/responseHandler';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const result: {user: {id: number, username: string, email: string}, token: string} = await authService.signUpUser(username, email, password);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(201).json(apiResponse('success', 'User signed up successfully', result.user));
  } catch (error) {
    res.status(400).json(apiResponse('error', (error as any).message));
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authService.loginUser(email, password);
    res.cookie('token', result.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    })
    res.status(200).json(apiResponse('success', 'User logged in successfully', result.user));
  } catch (error) {
    res.status(401).json(apiResponse('error', (error as any).message));
  }
};

export const status = async(req: Request, res: Response) => {
  const roles = await authService.status((req as any).user.id);
  const result = roles?.roles.map((role) => role.role.name);
  res.status(200).json(apiResponse('success', 'User is logged in', result));
}

export const logout = async(req: Request, res: Response) => {
  res.cookie('token', '');
  res.status(202).json(apiResponse('success', 'loggedout succesfully'));
}