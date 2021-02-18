const express = require("express");
const Category = require("../models/Category");
const app = express();

app.get("/categories", async (req, res) => {
  const categories = await Category.find({});
  res.send(categories);
});

app.post("/addcategory", async (req, res) => {
  const category = await new Category({
    name: req.body.name,
  });

  category.save();
  res.send("Added Category");
});

app.delete("/deletecategory/:id", async (req, res) => {
  const result = await Category.deleteOne({ _id: req.params.id });
  res.send(result);
});

module.exports = app;
