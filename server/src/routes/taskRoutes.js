const express = require("express");
const mongoose = require("mongoose");
const Task = mongoose.model("Task");

const router = express.Router();

router.post("/task", async (req, res) => {
  const {
    manager,
    taskName,
    campaign,
    location,
    peopleNeeded,
    description,
    fromTime,
    toTime,
    date,
  } = req.body;
  const peopleEnlisted = [];

  try {
    const task = new Task({
      manager,
      taskName,
      campaign,
      location,
      peopleNeeded,
      description,
      fromTime,
      toTime,
      date,
      peopleEnlisted,
    });
    await task.save();

    res.send({
      task,
    });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    if (!tasks) {
      return res.status(422).send({ error: "No tasks found" });
    }
    res.send(tasks);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.patch("/task/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const task = await Task.findById(id);
    let peopleEnlisted = task.peopleEnlisted;
    peopleEnlisted = [...peopleEnlisted, updates.peopleEnlisted];
    const result = await Task.findByIdAndUpdate(
      id,
      { peopleEnlisted: peopleEnlisted },
      {
        new: true,
      }
    );
    res.send(result);
  } catch (err) {
    return res.status(422).send(err);
  }
});

module.exports = router;
