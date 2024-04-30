/** @format */
const express = require("express");

const router = express.Router();
const {
  getBrandById,
  getBrands,
  createBrand,
  updateBrand,
  deleteBrand,
} = require("../services/brandService");
const { 
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
  getBrandValidator,
} = require("../utils/validators/brandValidator");

// const subCategoriesRoute = require("./subCategoryRoute");

// router.use("/:categoryId/subcategories", subCategoriesRoute);

router.route("/").get(getBrands).post(createBrandValidator, createBrand);

router
  .route("/:id")
  .get(getBrandValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
module.exports = router;
