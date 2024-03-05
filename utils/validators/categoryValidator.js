/** @format */
const { check } = require("express-validator");
const validator = require("../../middlewares/validatorMiddleware");

exports.getCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id formate!!"),
  validator,
];

exports.createCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("Category required!")
    .isLength({ min: 3 }) // Corrected syntax here
    .withMessage("Category name must be at least 3 characters long!")
    .isLength({ max: 32 })
    .withMessage("Category name must be not more than 32 characters!"),
  validator,
];

exports.updateCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id formate!!"),
  validator,
];

exports.deleteCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid Category Id formate!!"),
  validator,
];
