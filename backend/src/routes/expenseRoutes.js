import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addExpense, getGroupExpenses, getUserStatus } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/:groupId", protect, getGroupExpenses);
router.get("/:groupId/status/:userId",protect , getUserStatus)



export default router;
