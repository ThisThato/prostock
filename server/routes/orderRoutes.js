import express from "express";
const router = express.Router();
import {
  addOrderItems,
  updateOrderToPaid,
} from "../controllers/orderController.js";
import { getOrderById } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

//Fetch all products
//GET  /api/products
//public
router.route("/").post(protect, addOrderItems);

//Get order by id
//GET  /api/orders
//public
router.route("/:id").get(protect, getOrderById);

//UPDATE order to paid
//GET  /api/orders/:id/pay
//privatec
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
