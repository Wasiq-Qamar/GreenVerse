const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  productId: {
    type: String,
  },
  method: {
    type: String,
  },
  amount: {
    type: String,
  },
  cardNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  zipcode: {
    type: String,
  },
  city: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
  },
});

mongoose.model("Order", orderSchema);
