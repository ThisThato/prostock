import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

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
router.route("/").post(registerUser).get(protect, admin, getUsers);

// PUT User profile
// PUT  /api/users/profile
// private
router.route("/profile").put(protect, updateUserProfile);

// Delete a User
// DELETE  /api/users/:id
// private/admin
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
