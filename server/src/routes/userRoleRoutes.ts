import express from 'express';
import * as userRoleRoutes from '../controllers/userRoleController';
import { rolePermissionMiddleware } from '../middleware/rolePermissionMiddleware';

const router = express.Router();

// Assign a Role to a User
router.post('/assign', rolePermissionMiddleware("Role Management", "Assign"), userRoleRoutes.assignRoleToUserController);

// Get Roles for a User
router.get('/:userId/roles', rolePermissionMiddleware("Role Management", "View"), userRoleRoutes.getRolesForUserController);

// Get Users for a Role
router.get('/:roleId/users', rolePermissionMiddleware("Role Management", "View"), userRoleRoutes.getUsersForRoleController);

// Remove a Role from a User
router.delete('/remove', rolePermissionMiddleware("Role Management", "Delete"), userRoleRoutes.removeRoleFromUserController);

export default router;
