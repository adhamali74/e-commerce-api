/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const Brand = require("../models/brandModel");
const ApiError = require("../utils/apiError");

//@desc     get brands
//@route    GET /api/v1/brands
//@access   public
exports.getBrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const brands = await Brand.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

//@desc     get specific category
//@route    GET /api/v1/categories/:id
//@access   public
exports.getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`No brand for this id:" ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

//@desc     create category
//@route    POST /api/v1/categories
//@access    private
exports.createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await Brand.create({ name, slug: slugify(name) });
  res.status(201).json({ msg: "Brand Created Successfully", data: brand });
});

//@desc      update category
//@route     POST /api/v1/categories
//@access    private

exports.updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await Brand.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`no brand for this id: ${id}`, 404));
  }
  res.status(200).json({ msg: "Brand updated successfully", data: brand });
});

//@desc     delete category
//@route     DELETE /api/v1/categories
//@access    private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  // console.log("Before category deletion");
  const brand = await Brand.findOneAndDelete({ _id: id });
  // console.log("After category deletion, category:", category);

  if (!brand) {
    return next(new ApiError(`no brand for this id:  ${id}`, 404));
  }
  res.status(204).json({ msg: "Brand deleted successfully", data: brand });
});
