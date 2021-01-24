import asynchandler from "express-async-handler";
import Order from "../models/order.js";

//Create new order
//POST  /api/orders
//public
const addOrderItems = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    //Create a new order in the database
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

//Get order by id
//GET  /api/orders
//public
const getOrderById = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//UPDATE order to paid
//GET  /api/orders/:id/pay
//private
const updateOrderToPaid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order Not Found");
  }
});

//GET  logged in user orders
//GET  /api/orders/myorders
//private
const getMyOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  //console console.log("Order");
  res.json(orders);
});


//GET  all orders
//GET  /api/admin/orders
//private
const getOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  //console console.log("Order");
  res.json(orders);
});

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders, getOrders };
