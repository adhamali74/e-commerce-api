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
  getCategoryValidator,
  createBrandValidator,
  deleteBrandValidator,
  updateBrandValidator,
} = require("../utils/validators/brandValidator");

// const subCategoriesRoute = require("./subCategoryRoute");

// router.use("/:categoryId/subcategories", subCategoriesRoute);

router.route("/").get(getBrands).post(createBrandValidator, createBrand);
router
  .route("/:id")
  .get(getCategoryValidator, getBrandById)
  .put(updateBrandValidator, updateBrand)
  .delete(deleteBrandValidator, deleteBrand);
module.exports = router;
