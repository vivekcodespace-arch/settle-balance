import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGroup, addMember, getUserGroups} from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", protect, createGroup);
router.post("/add-member", protect, addMember);
router.get("/getUserGroups",protect, getUserGroups);

export default router;
