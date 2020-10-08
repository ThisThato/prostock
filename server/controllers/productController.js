import asynchandler from "express-async-handler";
import Product from "../models/product.js";

//Fetch all products
//GET  /api/products
//public
const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//Fetch product by ID
//GET  /api/product/:id
//public
const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

export { getProducts, getProductById };
