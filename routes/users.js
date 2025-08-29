import express from "express";
import { getUsers, updateUserRole } from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.use(protect, adminOnly);
router.get("/", getUsers);
router.patch("/:id/role", updateUserRole);

export default router;
