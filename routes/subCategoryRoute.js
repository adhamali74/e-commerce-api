/** @format */

const express = require("express");

const {
  createSubCategory,
  getSubCategoryById,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory,
  setCategoryIdToBody,
  createFilteredObj,
} = require("../services/subCategoryService");
const {
  createSubCategoryValidator,
  updateSubCategoryValidator,
  getSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFilteredObj, getSubCategories);

router
  .route("/:id")
  .put(updateSubCategoryValidator, updateSubCategory)
  .get(getSubCategoryValidator, getSubCategoryById)
  .delete(deleteSubCategoryValidator, deleteSubCategory);
module.exports = router;
