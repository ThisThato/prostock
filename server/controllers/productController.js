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

//DELETE product by ID
//DELETE  /api/products/:id
//private/Admin
const deleteProduct = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//Update a product
//PUT  /api/products/:id
//private/Admin
const updateProduct = asynchandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    numReviews,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.numReviews = numReviews;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new error("Product not found");
  }
});

//Create a product
//POST  /api/products
//private/Admin
const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});
export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
