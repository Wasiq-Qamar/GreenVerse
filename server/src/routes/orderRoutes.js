const express = require("express");
const mongoose = require("mongoose");
const Order = mongoose.model("Order");

const router = express.Router();

router.post("/order", async (req, res) => {
  const {
    userId,
    productId,
    method,
    amount,
    cardNumber,
    address,
    zipcode,
    city,
    orderDate,
    completed,
  } = req.body;

  try {
    const order = new Order({
      userId,
      productId,
      method,
      amount,
      cardNumber,
      address,
      zipcode,
      city,
      orderDate,
      completed,
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
    const orders = await Order.find();
    if (!orders) {
      return res.status(422).send({ error: "No orders found" });
    }
    res.send(orders);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/user/orders", async (req, res) => {
  const userId = req.body;

  try {
    const orders = await Order.find();
    orders = orders.filter((item) => item.userId === userId);
    res.send(orders);
  } catch (err) {
    return res.status(422).send(err);
  }
});

module.exports = router;
