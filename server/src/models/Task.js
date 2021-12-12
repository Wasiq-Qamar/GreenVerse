const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  manager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
  peopleEnlisted: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      progress: { type: Number, default: 0 },
      jobAssigned: { type: String, default: "Nothing Yet" },
      jobImage: { type: String, default: "" },
    },
  ],
  messages: [
    {
      user: String,
      text: String,
    },
  ],
});

mongoose.model("Task", taskSchema);
