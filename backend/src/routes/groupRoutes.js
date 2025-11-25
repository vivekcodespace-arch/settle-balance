import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGroup, addMember } from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", protect, createGroup);
router.post("/add-member", protect, addMember);

export default router;
