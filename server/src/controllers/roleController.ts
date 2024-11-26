import { Request, Response } from "express";
import * as roleService from "../services/roleService";
import { apiResponse } from "../utils/responseHandler";

export const createRole = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  try {
    const role = await roleService.createRole(name, description);
    res.status(201).json(role);
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to create role" });
    return;
  }
};

export const getAllRoles = async (_: Request, res: Response) => {
  try {
    const roles = await roleService.getAllRoles();
    res.status(200).json(apiResponse("true", "All role list", roles));
    return;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch roles" });
    return;
  }
};

export const deleteRole = async(req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const del = await roleService.deleteRole(Number(id));
    res.status(202).json(apiResponse("true", "Role delted", del));
    return;
  } catch (error) {
    res.status(500).json(apiResponse("false", (error as any).message));
    return;
  }
}