import express from "express";
import * as userController from "../controllers/userController";

const router = express.Router();

router.post("/", userController.createUser);
router.put("/:id", userController.editUser);
router.get("/", userController.getAllUsers);

export default router;
