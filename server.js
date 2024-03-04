/** @format */

const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Schema } = mongoose;
dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");

// connecting db connection
dbConnection();
//middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode:${process.env.NODE_ENV}`);
}

//Mount Routes
app.use("/api/v1/categories", categoryRoute);
//creating error and send it to error handler middleware
app.all("*", (req, res, next) => {
  const err = new Error("cant find this route" + req.originalUrl);
  next(err.message);
});

//global error handling
app.use((err, req, res, next) => {
  res.status(500).json({ err });
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
