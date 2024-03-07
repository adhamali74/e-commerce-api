/** @format */

const express = require("express");

const {
  createSubCategory,
  getSubCategoryById,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  updateSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router();

router
  .route("/")
  .post(createSubCategoryValidator, createSubCategory)
  .get(getSubCategories);

router
  .route("/:id")
  .put(updateSubCategoryValidator, updateSubCategory)
  .get(getSubCategoryValidator, getSubCategoryById)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
