import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
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

// PUT User profile
// PUT  /api/users/profile
// private
router.route("/profile").put(protect, updateUserProfile);

export default router;
