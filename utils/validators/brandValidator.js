/** @format */
const { check } = require("express-validator");
const validator = require("../../middlewares/validatorMiddleware");

exports.getBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id formate!!"),
  validator,
];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .withMessage("Brand is required!")
    .isLength({ min: 3 }) // Corrected syntax here
    .withMessage("Brand name must be at least 3 characters long!")
    .isLength({ max: 32 })
    .withMessage("Brand name must be not more than 32 characters!"),
  validator,
];

exports.updateBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id formate!!"),
  validator,
];

exports.deleteBrandValidator = [
  check("id").isMongoId().withMessage("Invalid Brand Id formate!!"),
  validator,
];
