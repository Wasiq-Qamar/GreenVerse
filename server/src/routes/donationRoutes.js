const express = require("express");
const mongoose = require("mongoose");
const Donation = mongoose.model("Donation");

const router = express.Router();

router.post("/donation", async (req, res) => {
  const {
    userId,
    organization,
    method,
    amount,
    cardNumber,
    anonymous,
    donationDate,
    completed,
  } = req.body;

  try {
    const donation = new Donation({
      userId,
      organization,
      method,
      amount,
      cardNumber,
      anonymous,
      donationDate,
      completed,
    });
    await donation.save();

    res.send({
      donation,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/donations", async (req, res) => {
  try {
    const donations = await Donation.find();
    if (!donations) {
      return res.status(422).send({ error: "No donations found" });
    }
    res.send(donations);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/user/donations", async (req, res) => {
  // const { userId } = req.body;
  // console.log(userId);
  try {
    let donations = await Donation.find();
    // donations = donations.filter((item) => item.userId === userId);
    res.send(donations);
    console.log(donations);
  } catch (err) {
    console.log(err);
    return res.status(422).send(err);
  }
});

module.exports = router;
