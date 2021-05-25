const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const userName = "";
  const image = "";
  const contact = "";
  const userType = "User";

  try {
    const user = new User({
      userName,
      email,
      password,
      contact,
      image,
      userType,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({
      token,
      userId: user._id,
      userName: user.userName,
      password: user.password,
      email: user.email,
      imageUri: image,
      contact: contact,
      userType: userType,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).send({ error: "Invalid password or email" });
  }

  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, "MY_SECRET_KEY");
    res.send({
      token,
      userId: user._id,
      userName: user.userName,
      password: user.password,
      email: user.email,
      imageUri: user.image,
      contact: user.contact,
      userType: user.userType,
    });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password or email" });
  }
});

// router.get("/user/:id", requireAuth, async (req, res) => {
//   const id = req.params.id;

//   try {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(422).send({ error: "Invalid id" });
//     } else {
//       const user = await User.findById({ id });
//       if (!user) {
//         return res.status(422).send({ error: "Invalid password or email" });
//       }
//       res.send({ user });
//     }
//   } catch (err) {
//     return res.status(422).send({ error: err.message });
//   }
// });

router.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  console.log(updates);

  try {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.patch("/user/uploadImage/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;
  try {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
