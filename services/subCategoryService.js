/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const SubCategory = require("../models/subCategoryModel");

//@desc     create Subcategory
//@route    POST /api/v1/subcategories
//@access    private

exports.setCategoryIdToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};

exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subcategory = await SubCategory.create({
    name,
    slug: slugify(name),
    category,
  });
  res
    .status(201)
    .json({ msg: "subCategory Created Successfully", data: subcategory });
});

//@desc     get subcategory
//@route    GET /api/v1/subcategories
//@access   public

exports.createFilteredObj = (req, res, next) => {
  let filteredObj = {};
  if (req.params.categoryId) filteredObj = { category: req.params.categoryId };
  req.filterObj = filteredObj;
  next();
};

exports.getSubCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const subCategories = await SubCategory.find(req.filterObj)
    .skip(skip)
    .limit(limit);
  // .populate({ path: "category", select: "name" });
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

//@desc     get specific subcategory
//@route    GET /api/v1/subcategories/:id
//@access   public

exports.getSubCategoryById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  // .populate({
  //   path: "category",
  //   select: "name",
  // });
  if (!subCategory) {
    return next(new ApiError(`No subcategory for this id:" ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
  next();
});

//@desc      update subcategory
//@route     POST /api/v1/subcategories
//@access    private

exports.updateSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subCategory = await SubCategory.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subCategory) {
    return next(new ApiError(`no Subcategory for this id: ${id}`, 404));
  }
  res
    .status(200)
    .json({ msg: "subcategory updated successfully", data: subCategory });
  next();
});

//@desc     delete subcategory
//@route     DELETE /api/v1/subcategories
//@access    private

exports.deleteSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findOneAndDelete({ _id: id });
  if (!subCategory) {
    return next(new ApiError(`no Subcategory for this id:  ${id}`, 404));
  }
  res
    .status(204)
    .json({ msg: "Subcategory deleted successfully", data: subCategory });
  next();
});
