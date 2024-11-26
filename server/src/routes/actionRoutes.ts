import express from 'express';
import * as actionRoutes from '../controllers/actionController';

const router = express.Router();

router.post('/', actionRoutes.createActionController);  // Create Action
router.get('/', actionRoutes.getAllActionsController);  // Get All Actions
router.put('/:id', actionRoutes.updateActionController);  // Update Action
router.delete('/:id', actionRoutes.deleteActionController);  // Delete Action

export default router;
