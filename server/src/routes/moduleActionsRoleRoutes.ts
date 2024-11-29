import express from 'express';
import * as moduleActionRoles from '../controllers/moduleActionsRoleController';

const router = express.Router();

// Assign a ModuleAction to a Role
router.post('/assign', moduleActionRoles.assignModuleActionToRoleController);

// Get all ModuleActions for a Role
router.get('/', moduleActionRoles.getModuleActionsForRoleController);

// Get all Roles for a ModuleAction
router.get('/:moduleActionId/roles', moduleActionRoles.getRolesForModuleActionController);

// Delete a Role-to-ModuleAction Mapping
router.delete('/delete', moduleActionRoles.deleteModuleActionRoleMappingController);

export default router;
