/** @format */
const { check } = require("express-validator");
const validator = require("../../middlewares/validatorMiddleware");

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .withMessage("SubCategory required!")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters long!")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be not more than 32 characters!"),
  check("category")
    .isMongoId()
    .withMessage("Invalid Category id format !")
    .notEmpty()
    .withMessage("SubCategory Must belong to Category! "),
  validator,
];

exports.getSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format!!"),
  validator,
];
exports.updateSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format!!"),
  check("name")
    .notEmpty()
    .withMessage("SubCategory required!")
    .isLength({ min: 2 })
    .withMessage("SubCategory name must be at least 3 characters long!")
    .isLength({ max: 32 })
    .withMessage("SubCategory name must be not more than 32 characters!"),
  check("category")
    .isMongoId()
    .withMessage("Invalid Category id format !")
    .notEmpty()
    .withMessage("SubCategory Must belong to Category! "),
  validator,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId().withMessage("Invalid SubCategory Id format!!"),
  validator,
];
