import express from "express";
import asynchandler from "express-async-handler";
import Product from "../models/product.js";

const router = express.Router();

//Fetch all products
//GET  /api/products
//public
router.get(
  "/",
  asynchandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  })
);

//Fetch product by ID
//GET  /api/product/:id
//public
router.get(
  "/:id",
  asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  })
);

export default router;
