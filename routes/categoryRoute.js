/** @format */
const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategories);
router
  .route("/:id")
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);
module.exports = router;
