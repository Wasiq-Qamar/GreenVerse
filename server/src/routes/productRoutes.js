const express = require("express");
const mongoose = require("mongoose");
const Product = mongoose.model("Donation");

const router = express.Router();

router.post("/product", async (req, res) => {
  const { productName, productImg, quantity } = req.body;

  try {
    const product = new Product({
      productName,
      productImg,
      quantity,
    });
    await product.save();

    res.send({
      product,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res.status(422).send({ error: "No products found" });
    }
    res.send(products);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
