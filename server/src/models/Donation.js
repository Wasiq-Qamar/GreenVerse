const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  userName: {
    type: String,
  },
  organization: {
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
  anonymous: {
    type: Boolean,
  },
  donationDate: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
  },
});

mongoose.model("Donation", donationSchema);
