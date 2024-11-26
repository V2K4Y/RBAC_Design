import express from 'express';
import * as userRoleRoutes from '../controllers/userRoleController';

const router = express.Router();

// Assign a Role to a User
router.post('/assign', userRoleRoutes.assignRoleToUserController);

// Get Roles for a User
router.get('/:userId/roles', userRoleRoutes.getRolesForUserController);

// Get Users for a Role
router.get('/:roleId/users', userRoleRoutes.getUsersForRoleController);

// Remove a Role from a User
router.delete('/remove', userRoleRoutes.removeRoleFromUserController);

export default router;
