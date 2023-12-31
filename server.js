/** @format */

const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });

app.get("/", (req, res) => {
  res.send("Hello from API1");
});

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
