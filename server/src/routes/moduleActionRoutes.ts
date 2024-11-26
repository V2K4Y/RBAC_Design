import express from 'express';
import * as moduleActionRoutes from '../controllers/moduleActionController';

const router = express.Router();

router.post('/assign', moduleActionRoutes.assignActionToModuleController);  // Assign Action to Module
router.get('/:moduleId/actions', moduleActionRoutes.getActionsForModuleController);  // Get Actions for Module

export default router;
