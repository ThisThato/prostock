import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//Fetch all products
//GET  /api/products
//public
router.post("/login", authUser);

// GET User profile
// GET  /api/users/login
// private
router.route("/profile").get(protect, getUserProfile);

// Register a new User
// POST  /api/users
// public
router.route("/").post(registerUser);

export default router;
