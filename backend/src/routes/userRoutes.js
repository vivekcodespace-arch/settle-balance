import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { showAllUsers } from "../controllers/userController.js";


const router = express.Router();

router.get("/all",protect, showAllUsers);


export default router;