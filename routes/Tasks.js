const { response } = require("express");
const express = require("express");
const Task = require("../models/Tasks");
const app = express();

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find({});
  res.send(tasks);
});

app.post("/addtask", async (req, res) => {
  const task = await new Task({
    name: req.body.name,
    status: req.body.status,
    category: req.body.category,
  });

  task.save();
  res.send("Added Task");
});

app.delete("/deleteTask/:id", async (req, res) => {
  const result = await Task.deleteOne({ _id: req.params.id });
  res.send("Task Deleted");
});

app.put("/updateTask/:id", async (req, res) => {
  const result = await Task.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        status: req.body.status,
        category: req.body.category,
      },
    }
  );
  console.log(result);
  res.send("Task Updated");
});
module.exports = app;
