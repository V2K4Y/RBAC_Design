import { Request, Response } from "express";
import * as userService from "../services/userService";

export const createUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;
  
  if (!email || !password || !username || !role) {
    res.status(400).json({ message: "All fields are required." });
    return
  }
  try {
    const user = await userService.createUser(username, email, password, role);
    res.status(user?.code || 201).json(user);
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  try {
    const user = await userService.editUser(parseInt(id), {...payload});
    res.status(200).json(user);
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to edit user" });
    return
  }
};

export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    
    const result = users.map((user) => ({
      ...user,
      roles: user.roles.map(roleEntry => roleEntry.role.name)
    }))

    res.status(200).json(result);
    return
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
    return
  }
};
