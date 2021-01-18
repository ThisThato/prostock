import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} from "../controllers/productController.js";
const router = express.Router();

//Fetch all products
//GET  /api/products
//public
router.route("/").get(getProducts).post(protect, admin, createProduct);

//Fetch product by ID
//GET  /api/product/:id
//public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
