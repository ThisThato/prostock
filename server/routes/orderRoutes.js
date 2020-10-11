import express from "express";
const router = express.Router();
import { addOrderItems } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//Fetch all products
//GET  /api/products
//public
router.post("/", protect, addOrderItems);

export default router;
