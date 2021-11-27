const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  productId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  buyerName: {
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
    default: false,
  },
});

mongoose.model("Order", orderSchema);
