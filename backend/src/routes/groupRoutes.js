import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createGroup, addMember, getUserGroups, getGropuDetails, getUserswithGroupId} from "../controllers/groupController.js";

const router = express.Router();

router.post("/create", protect, createGroup);
router.post("/add-member", protect, addMember);
router.get("/getUserGroups",protect, getUserGroups);
router.get("/:id",protect, getGropuDetails);
router.get("/:groupId/members", protect, getUserswithGroupId);

export default router;
