import express from 'express';
import roleRoutes from "./roleRoutes";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import userRoles from './userRoleRoutes';
import moduleRoutes from './moduleRoutes';
import actionRoutes from './actionRoutes';
import moduleAction from './moduleActionRoutes';
import moduleActionsRole from './moduleActionsRoleRoutes'
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use("/auth", authRoutes);

router.use(authMiddleware);
router.use("/roles", roleRoutes);
router.use("/users", userRoutes);
router.use('/user-roles', userRoles);
router.use('/modules', moduleRoutes);
router.use('/actions', actionRoutes);
router.use('/module-actions', moduleAction);
router.use('/module-actions-role', moduleActionsRole)


export default router;