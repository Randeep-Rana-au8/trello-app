const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Task = require("./routes/Tasks");
const Category = require("./routes/Category");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect("mongodb+srv://rana01:adminrana@cluster0.egpsr.mongodb.net/test", {
  useUnifiedTopology: true,
  useCreateIndex: true,
  useNewUrlParser: true,
});

app.use("/", Task);
app.use("/", Category);

app.get("/", (req, res) => {
  res.send("Health Ok");
});

app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`App is running on port ${port}`);
});
