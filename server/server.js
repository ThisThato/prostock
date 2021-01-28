import express from "express";
import dotenv from "dotenv";
import path from 'path'
import bodyParser from "body-parser";
import colors from "colours";
import morgan from 'morgan'
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errormiddleware.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

connectDB();

const app = express();
if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'))
}

// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

//body-parser for Post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Products, User and Order Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/client/build')))
    app.get('*', (req, res) => res.sendFile(path.reslove(__dirname, 'client', 'build', 'index.html')))
}else{
   app.get("/", (req, res) => {
   res.send("API is running...");
 });

}

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
