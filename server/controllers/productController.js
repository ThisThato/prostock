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
    countInStock
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
 
  // const { name } = req.body;

  // const productExists = await Product.findOne({ name })
 
  // if (productExists) {
  //   res.status(400);
  //   throw new Error("Product already exists");
  // }

  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    description: req.body.description,
    numReviews: req.body.numReviews,
    countInStock: req.body.countInStock,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


//Create a new Review
//POST  /api/products/:id/reviews
//private
const createProductReview = asynchandler(async (req, res) => {
  const {
    rating, comment
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
     const alreadyReviewed = product.reviews.find(r => r.user.toString( ) === req.user._id.toString())  

     if(alreadyReviewed){
       res.status(400)
       throw new Error('Product already reviewed')
     }

     const review = {
        name: req.user.name, 
        rating: Number(rating), 
        comment, 
        user: req.user._id

     }
  
     product.reviews.push(review)
     product.numReviews = product.reviews.length

     product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0 ) /product.reviews.length

     await product.save()

    res.status(201).json({message: 'Review added'});
  } else {
    res.status(404);
    throw new error("Product not found");
  }
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
};
