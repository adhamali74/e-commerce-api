/** @format */
const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategories,
  getCategoryById,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategories);
router.route("/:id").get(getCategoryById);
module.exports = router;
