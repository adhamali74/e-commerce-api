/** @format */
const { check } = require("express-validator");
const validator = require("../../middlewares/validatorMiddleware");

exports.getProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id formate!!"),
  validator,
];

exports.createProductValidator = [
  check("title")
    .notEmpty()
    .withMessage("Product required!")
    .isLength({ min: 3 })
    .withMessage("Product name must be at least 3 characters long!")
    .isLength({ max: 32 })
    .withMessage("Product name must be not more than 32 characters!"),
  validator,
  check("description")
    .notEmpty()
    .withMessage("Product description required!")
    .isLength({ min: 20 })
    .withMessage("Product description must not be less than 20 characters"),
  validator,
  check("quantity").notEmpty().withMessage("quantity required!"),
  validator,
  check("price").notEmpty().withMessage("price required!"),
  validator,
  check("imageCover").notEmpty().withMessage("imageCover required!"),
  validator,
  check("category")
    .notEmpty()
    .withMessage("product must be belong to category!"),
  validator,
];

exports.updateProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id formate!!"),
  validator,
];

exports.deleteProductValidator = [
  check("id").isMongoId().withMessage("Invalid Product Id formate!!"),
  validator,
];
