/** @format */
const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");

//@desc     get category
//@route    GET /api/v1/categories
//@access   public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryModel.find({});
  res.status(200).json({ results: categories.length, data: categories });
});

//@desc     create category
//@route    POST /api/v1/categories
//@access    private
exports.createCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});
