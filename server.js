/** @format */

const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Schema } = mongoose;
dotenv.config({ path: "config.env" });

// connecting db connection
mongoose
  .connect(process.env.db_url)
  .then((conn) => {
    console.log(`database connection established ${conn.connection.host}`);
  })
  .catch((err) => {
    console.log(`database connection failed: ${err}`);
  });
//middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//1-creating schema
const categorySchema = new mongoose.Schema({
  name: String,
});
//2-Schema Model
const categoryModel = new mongoose.model("Category", categorySchema);

//routes
// app.get("/", (req, res) => {
//   const name = req.body.name;
//   console.log(name);
// });

app.get("/", (req, res) => {
  res.send("Hello from API1");
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
 