const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const Task = mongoose.model("Task");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const userName = "";
  const image = "";
  const contact = "";
  const userType = req.body.userType || "User";

  if (!email || !password) {
    return res.status(422).json({ error: "Must provide email and password" });
  }

  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!email.match(regEx)) {
    return res.status(422).json({ error: "Must provide valid email" });
  }

  if (password.length < 8) {
    return res
      .status(422)
      .json({ error: "Password must contain atleast 8 characters" });
  }

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
      tasks: [],
    });
  } catch (err) {
    console.log(err);
    return res.status(422).json({ error: err.message });
  }
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ error: "Must provide email and password" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(422).json({ error: "Invalid password or email" });
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
    return res.status(422).json({ error: "Invalid password or email" });
  }
});

router.get("/users", requireAuth, async (req, res) => {
  try {
    let users = await User.find();
    if (!users) {
      return res.status(422).send({ error: "no users found" });
    }
    users = users.filter((item) => item.email !== "admin@email.com");
    res.send(users);
  } catch (err) {
    return res.status(422).send({ error: err.message });
  }
});

router.patch("/user/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  const regEx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!updates.email.match(regEx)) {
    return res.status(402).json({ error: "Invalid Email" });
  }

  if (updates.contact.length !== 11 && updates.contact.length > 0) {
    return res.status(402).json({ error: "Invalid Contact Number" });
  }

  try {
    const result = await User.findByIdAndUpdate(id, updates, { new: true });
    res.send(result);
  } catch (err) {
    return res.status(422).json({ error: err.message });
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

router.patch("/user/promote/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { userType: "Manager" },
      { new: true }
    );
    let users = await User.find();
    users = users.filter((item) => item.email !== "admin@email.com");
    res.send(users);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.patch("/user/demote/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const result = await User.findByIdAndUpdate(
      id,
      { userType: "User" },
      { new: true }
    );
    let users = await User.find();
    users = users.filter((item) => item.email !== "admin@email.com");
    res.send(users);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.delete("/user/:userId", async (req, res) => {
  const id = req.params.userId;
  try {
    const user = await User.findById(id);
    const userTasks = user.tasks;
    userTasks.forEach(async (item) => {
      const task = await Task.findById(item.task);
      let people = task.peopleEnlisted;
      people = people.filter((items) => items.user !== id);
      await Task.findByIdAndUpdate(id, { peopleEnlisted: people });
    });
    const result = await User.findByIdAndDelete(id);
    let users = await User.find();
    users = users.filter((item) => item.email !== "admin@email.com");
    res.send(users);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

module.exports = router;
