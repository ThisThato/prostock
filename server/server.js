import express from "express";
import dotenv from "dotenv";
import colors from "colours";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/products", productRoutes);

//Middleware error catching
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on Port ${PORT}`.yellow
  )
);
