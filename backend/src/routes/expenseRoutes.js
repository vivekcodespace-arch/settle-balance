import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { addExpense, getExpenses } from "../controllers/expenseController.js";

const router = express.Router();

router.post("/add", protect, addExpense);
router.get("/:group_id", protect, getExpenses);

export default router;
