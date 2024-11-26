import express from "express";
import * as roleController from "../controllers/roleController";

const router = express.Router();

router.post("/", roleController.createRole);
router.get("/", roleController.getAllRoles);

export default router;
