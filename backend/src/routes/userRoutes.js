import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { showAllUsers, showName } from "../controllers/userController.js";


const router = express.Router();

router.get("/all",protect, showAllUsers);
router.get("/:user_id",protect,showName);

export default router;