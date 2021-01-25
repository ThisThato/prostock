import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getMyOrders,
  getOrders,
  updateOrderToPaid,
  getOrderById, updateOrderToDelivered 
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

//Fetch all orders
//GET  /api/orders
//public
router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);

//GET  logged in user orders
//GET  /api/orders/myorders
//private
router.route("/myorders").get(protect, getMyOrders);

//Get order by id
//GET  /api/orders
//public
router.route("/:id").get(protect, getOrderById);


//UPDATE order to delivered
//GET  /api/orders/:id/deliver
//private
router.route("/:id/deliver").put(protect, admin, updateOrderToDelivered);

//UPDATE order to paid
//GET  /api/orders/:id/pay
//private
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
