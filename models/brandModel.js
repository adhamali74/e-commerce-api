/** @format */
const mongoose = require("mongoose");

//1-creating schema
const BrandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand required"],
      unique: [true, "Brand must be unique"],
      minlength: [3, "too short Brand name"],
      maxlength: [32, "too long Brand name"],
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
const BrandModel = new mongoose.model("Brand", BrandSchema);

module.exports = BrandModel;
