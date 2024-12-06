import express from 'express';
import * as moduleActionRoles from '../controllers/moduleActionsRoleController';
import { rolePermissionMiddleware } from '../middleware/rolePermissionMiddleware';

const router = express.Router();

// Assign a ModuleAction to a Role
router.post('/assign', rolePermissionMiddleware("Role Management", "Assign"), moduleActionRoles.assignModuleActionToRoleController);

// Get all ModuleActions for a Role
router.get('/', rolePermissionMiddleware("Role Management", "View"), moduleActionRoles.getModuleActionsForRoleController);

// Get all Roles for a ModuleAction
router.get('/:moduleActionId/roles', rolePermissionMiddleware("Role Management", "View"), moduleActionRoles.getRolesForModuleActionController);

// Delete a Role-to-ModuleAction Mapping
router.delete('/delete', rolePermissionMiddleware("Role Management", "Delete"), moduleActionRoles.deleteModuleActionRoleMappingController);

export default router;
