import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
} from "../controllers/productController.js";
const router = express.Router();

//Fetch all products
//GET  /api/products
//public
router.route("/").get(getProducts);

//Fetch product by ID
//GET  /api/product/:id
//public
router.route("/:id").get(getProductById).delete(protect, admin, deleteProduct);

export default router;
