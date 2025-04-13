import express from "express";
import { registerUser, loginUser } from "../controllers/authcontroller.js";
import authMiddleware from "../middleware/authmiddleware.js"; 
import { getProfile } from "../controllers/authcontroller.js";

const router = express.Router();

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
