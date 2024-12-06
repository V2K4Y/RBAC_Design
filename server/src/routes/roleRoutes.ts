import express from "express";
import * as roleController from "../controllers/roleController";
import { rolePermissionMiddleware } from "../middleware/rolePermissionMiddleware";

const router = express.Router();

router.post("/", rolePermissionMiddleware("Role Management", "Create"), roleController.createRole);
router.get("/", rolePermissionMiddleware("Role Management", "View"), roleController.getAllRoles);

export default router;
