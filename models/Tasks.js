const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    default: "Pending",
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
