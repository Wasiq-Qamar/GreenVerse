const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  manager: {
    type: String,
  },
  taskName: {
    type: String,
  },
  campaign: {
    type: String,
  },
  location: {
    type: String,
  },
  peopleNeeded: {
    type: String,
  },
  description: {
    type: String,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  date: {
    type: String,
  },
  peopleEnlisted: [],
});

mongoose.model("Task", taskSchema);
