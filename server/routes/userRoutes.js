import express from "express";
const router = express.Router();
import { authUser, getUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//Fetch all products
//GET  /api/products
//public
router.post("/login", authUser);

// GET User profile
// GET  /api/users/login
// private
router.route("/profile").get(protect, getUserProfile);

export default router;
