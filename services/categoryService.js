/** @format */

const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

//@desc     get category
//@route    GET /api/v1/categories
//@access   public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await categoryModel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@desc     get specific category
//@route    GET /api/v1/categories/:id
//@access   public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categoryModel.findById(id);
  if (!category) {
    return next(new ApiError("No category for this id:" + id, 404));
  }
  res.status(200).json({ data: category });
});

//@desc     create category
//@route    POST /api/v1/categories
//@access    private
exports.createCategories = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const category = await categoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

//@desc      update category
//@route     POST /api/v1/categories
//@access    private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categoryModel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError("no category for this id:" + id, 404));
  }
  res
    .status(200)
    .json({ msg: "category updated successfully", data: category });
});

//@desc     delete category
//route     DELETE /api/v1/categories
//accees    private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await categoryModel.findOneAndDelete({ _id: id });
  if (!category) {
    return next(new ApiError("no category for this id:" + id, 404));
  }
  res
    .status(204)
    .json({ msg: "category deleted successfully", data: category });
});
