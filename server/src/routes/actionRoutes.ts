import express from 'express';
import * as actionRoutes from '../controllers/actionController';
import { rolePermissionMiddleware } from '../middleware/rolePermissionMiddleware';

const router = express.Router();

router.post('/', rolePermissionMiddleware("Role Management", "Create"), actionRoutes.createActionController);  // Create Action
router.get('/', rolePermissionMiddleware("Role Management", "View"), actionRoutes.getAllActionsController);  // Get All Actions
router.put('/:id', rolePermissionMiddleware("Role Management", "Update"), actionRoutes.updateActionController);  // Update Action
router.delete('/:id', rolePermissionMiddleware("Role Management", "Delete"), actionRoutes.deleteActionController);  // Delete Action

export default router;
