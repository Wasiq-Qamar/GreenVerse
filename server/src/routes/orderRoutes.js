const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

const router = express.Router();

router.post("/order", async (req, res) => {
  const {
    userId,
    productId,
    buyerName,
    method,
    amount,
    cardNumber,
    address,
    zipcode,
    city,
  } = req.body;

  try {
    const order = new Order({
      userId,
      productId,
      buyerName,
      method,
      amount,
      cardNumber,
      address,
      zipcode,
      city,
    });
    await order.save();

    res.send({
      order,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({ path: "userId", select: "userName email contact" })
      .populate({
        path: "productId",
        select: "productName productImg category price",
      });
    if (!orders) {
      return res.status(422).send({ error: "No orders found" });
    }
    res.send(orders);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/user/orders/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    let orders = await Order.find()
      .populate({ path: "userId", select: "userName email contact" })
      .populate({
        path: "productId",
        select: "productName productImg category price",
      });
    console.log(orders);
    orders = orders.filter((item) => item.userId._id == userId);
    res.send(orders);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
});

/**
 * PATCH complete order for amdin
 */

router.patch("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(
      orderId,
      { completed: true },
      { new: true }
    );
    res.send(order);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
});

module.exports = router;
