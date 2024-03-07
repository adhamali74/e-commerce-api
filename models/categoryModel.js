/** @format */
const mongoose = require("mongoose");

//1-creating schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category required"],
      unique: [true, "category must be unique"],
      minlength: [3, "too short category name"],
      maxlength: [32, "too long category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    image: String,
  },
  { timestamps: true }
);
//2-Schema Model
// eslint-disable-next-line new-cap
const categoryModel = new mongoose.model("Category", categorySchema);

module.exports = categoryModel;
