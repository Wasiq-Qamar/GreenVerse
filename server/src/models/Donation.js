const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
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
    default: false,
  },
  donationDate: {
    type: Date,
    default: Date.now(),
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

mongoose.model("Donation", donationSchema);
