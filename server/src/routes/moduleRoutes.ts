import express from 'express';
import * as moduleRoute from '../controllers/moduleController';

const router = express.Router();

router.post('/', moduleRoute.createModuleController);  // Create Module
router.get('/', moduleRoute.getAllModulesController);  // Get All Modules
router.put('/:id', moduleRoute.updateModuleController);  // Update Module
router.delete('/:id', moduleRoute.deleteModuleController);  // Delete Module

export default router;
