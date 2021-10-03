const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  productImg: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

mongoose.model("Product", productSchema);
