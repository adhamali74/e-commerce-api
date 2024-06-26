/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

//@desc     get category
//@route    GET /api/v1/categories
//@access   public
exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//@desc     get specific category
//@route    GET /api/v1/categories/:id
//@access   public
exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`No category for this id:" ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

//@desc     create category
//@route    POST /api/v1/categories
//@access    private
exports.createCategories = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name, slug: slugify(name) });
  res
    .status(201)
    .json({ msg: "Category Created Successfully", data: category });
});

//@desc      update category
//@route     POST /api/v1/categories
//@access    private

exports.updateCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`no category for this id: ${id}`, 404));
  }
  res
    .status(200)
    .json({ msg: "category updated successfully", data: category });
});

//@desc     delete category
//@route     DELETE /api/v1/categories
//@access    private
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // console.log("Before category deletion");
  const category = await Category.findOneAndDelete({ _id: id });
  // console.log("After category deletion, category:", category);

  if (!category) {
    return next(new ApiError(`no category for this id:  ${id}`, 404));
  }
  res
    .status(204)
    .json({ msg: "category deleted successfully", data: category });
});
