import express from "express";

import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

//Fetch all products
//GET  /api/products
//public
router.route("/").get(getProducts);

//Fetch product by ID
//GET  /api/product/:id
//public
router.route("/:id").get(getProductById);

export default router;
