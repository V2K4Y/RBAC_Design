import express from 'express';
import * as moduleActionRoutes from '../controllers/moduleActionController';
import { rolePermissionMiddleware } from '../middleware/rolePermissionMiddleware';

const router = express.Router();

router.get('/', rolePermissionMiddleware("Role Management", "View"), moduleActionRoutes.getAllModuleActionsController) // Get all module and mapped actions
router.post('/assign', rolePermissionMiddleware("Role Management", "Assign"), moduleActionRoutes.assignActionToModuleController);  // Assign Action to Module
router.get('/:moduleId/actions', rolePermissionMiddleware("Role Management", "View"), moduleActionRoutes.getActionsForModuleController);  // Get Actions for Module

export default router;
