import express from "express";
import { getStats } from "../controllers/statsController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/overview", protect, getStats);

export default router;
