/** @format */
const mongoose = require("mongoose");

//1-creating schema
const categorySchema = new mongoose.Schema({
  name: String,
});
//2-Schema Model
const categoryModel = new mongoose.model("Category", categorySchema);

module.exports = categoryModel;
