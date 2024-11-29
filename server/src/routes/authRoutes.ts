import express from 'express';
import * as authController from '../controllers/authControllers';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);
router.post('/status', authMiddleware, authController.status);
router.post('/logout', authController.logout);

export default router;