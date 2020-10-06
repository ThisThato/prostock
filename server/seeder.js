import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colours";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";
import connectDB from "./config/db.js";

// Do not Touch only used to import initial data
// Only used to destroy all the data
//Do not touch or run

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return { ...p, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log(`Data Successfuly imported!`.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();
    await User.deleteMany();

    console.log(`Data Successfuly destroyed!`.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
