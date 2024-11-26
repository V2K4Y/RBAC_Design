import express from 'express';
import * as authController from '../controllers/authControllers';

const router = express.Router();

router.post('/login', authController.login);
router.post('/signup', authController.signUp);

export default router;