/** @format */

const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const Product = require("../models/productModel");

//@desc     get products
//@route    GET /api/v1/products
//@access   public
exports.getProducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  const products = await Product.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: products.length, page, data: products });
});

//@desc     get specific product
//@route    GET /api/v1/products/:id
//@access   public
exports.getProductById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) {
    return next(new ApiError(`No product for this id:" ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

//@desc     create product
//@route    POST /api/v1/products
//@access    private
exports.createProduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await Product.create(req.body);
  res.status(201).json({ msg: "Product Created Successfully", data: product });
});

//@desc      update product
//@route     POST /api/v1/products
//@access    private

exports.updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.slug = slugify(req.body.title);
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`no product for this id: ${id}`, 404));
  }
  res.status(200).json({ msg: "product updated successfully", data: product });
});

//@desc     delete product
//@route     DELETE /api/v1/products
//@access    private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ _id: id });
  if (!product) {
    return next(new ApiError(`no product for this id:  ${id}`, 404));
  }
  res.status(204).json({ msg: "product deleted successfully", data: product });
});