/** @format */
const express = require("express");
const router = express.Router();
const { getCategories } = require("../services/categoryService");

router.get("/", getCategories);

module.exports = router;
