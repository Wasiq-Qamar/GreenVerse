const express = require("express");
const mongoose = require("mongoose");
const Task = mongoose.model("Task");

const router = express.Router();

/** 
 * Create a new task
 * @param {manager, taskName,campaign, location, peopleNeeded, description, fromTime, toTime, date,}
 * @returns {task} - an object of newly created task
 */
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

/**
 * Fetch array of all tasks
 * @returns {tasks} - An array of task objects
 */
router.get("/tasks", async (req, res) => {
  try { 
    const tasks = await Task.find().populate("manager", "userName email contact image").populate('peopleEnlisted.user', "userName email contact image")
    if (!tasks) {
      return res.status(422).send({ error: "No tasks found" });
    }
    res.send(tasks);
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

/**
 * Fetch a specific task
 * @returns {task} - a task object found by id in request
 */
router.get("/task/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id).populate("manager", "userName email contact image");
    res.send(task);
  } catch (err) {
    return res.status(422).send(err);
  }
});

/**
 * fetch tasks of a specific user 
 * @param {userId} 
 * @returns {tasks} - an array of tasks
 */
router.get("/user/tasks", async (req, res) => {
  const userId = req.body;

  try {
    const tasks = await Task.find();
    tasks = tasks.filter((item) => item.userId === userId);
    res.send(tasks);
  } catch (err) {
    return res.status(422).send(err);
  }
});

/**
 * Update a task
 * @param {object} - an object of updates with keys resembling schema names
 * @returns {task} - updated task object
 */
router.patch("/task/:id", async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  try {
    const task = await Task.findById(id);
    const result = await Task.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
      }
    );
    res.send(result);
  } catch (err) {
    return res.status(422).send(err);
  }
});

/**
 * Enlist user in task
 * @param {userId} - id of user to be enlisted
 * @returns {Object} - Updated task object
 */
router.patch("/task/:id/enlist", async (req, res) => {
  const id = req.params.id;
  const {userId} = req.body;
  const newEntry = {
    user: userId,
  }

  try {
    const task = await Task.findById(id);
    let peopleEnlisted = task.peopleEnlisted;
    peopleEnlisted = [...peopleEnlisted, newEntry];
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

/**
 * Remove user from task
 * @param {userId} - id of user to be removed
 * @returns {Object} - Updated task object
 */
router.patch("/task/:id/remove", async (req, res) => {
  const id = req.params.id;
  const {userId} = req.body;

  try {
    const task = await Task.findById(id);
    let peopleEnlisted = task.peopleEnlisted;
    peopleEnlisted = peopleEnlisted.filter(item => item.user != userId);
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

/**
 * Assign job to user
 * @param {userId, job} - id of user and job string 
 * @returns {Object} - Updated task object
 */
router.patch("/task/:id/job", async (req, res) => {
  const id = req.params.id;
  const {userId, job} = req.body;

  try {
    const task = await Task.findById(id);
    let peopleEnlisted = task.peopleEnlisted;
    let index = peopleEnlisted.findIndex((item) => item.user == userId);

    peopleEnlisted[index].jobAssigned = job

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

/**
 * Upload task image for user
 * @param {userId, Image} - id of user and image url
 * @returns {Object} - Updated task object
 */
router.patch("/task/:id/image", async (req, res) => {
  const id = req.params.id;
  const {userId, image} = req.body;

  try {
    const task = await Task.findById(id);
    let peopleEnlisted = task.peopleEnlisted;
    let index = peopleEnlisted.findIndex((item) => item.user == userId);

    peopleEnlisted[index].jobImage = image
    peopleEnlisted[index].progress = 5

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

/**
 * Delete Task
 * @returns {String} - Deleted Successfully
 */
router.delete("/task/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await Task.findByIdAndDelete(id);
    res.send("Deleted Successfully");
  } catch (err) {
    return res.status(422).send(err);
  }
});

module.exports = router;
