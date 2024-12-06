import express from 'express';
import * as moduleRoute from '../controllers/moduleController';
import { rolePermissionMiddleware } from '../middleware/rolePermissionMiddleware';

const router = express.Router();

router.post('/', rolePermissionMiddleware("Role Management", "Create"), moduleRoute.createModuleController);  // Create Module
router.get('/', rolePermissionMiddleware("Role Management", "View"), moduleRoute.getAllModulesController);  // Get All Modules
router.put('/:id', rolePermissionMiddleware("Role Management", "Update"), moduleRoute.updateModuleController);  // Update Module
router.delete('/:id', rolePermissionMiddleware("Role Management", "Delete"), moduleRoute.deleteModuleController);  // Delete Module

export default router;
