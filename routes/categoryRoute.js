/** @format */
const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategories,
} = require("../services/categoryService");

router.route("/").get(getCategories).post(createCategories);

module.exports = router;
