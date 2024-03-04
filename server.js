/** @format */

const express = require("express");
const app = express();
const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { Schema } = mongoose;
dotenv.config({ path: "config.env" });
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
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
  next(new ApiError("cant find this route" + req.originalUrl, 500));
});

//global error handling
app.use(globalError);

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
