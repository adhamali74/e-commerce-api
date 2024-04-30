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
    .withMessage("Product name must be at least 3 characters long!"),
  check("description")
    .notEmpty()
    .withMessage("Product description required!")
    .isLength({ max: 2000 })
    .withMessage(" too long  description!"),
  check("quantity")
    .notEmpty()
    .withMessage("quantity required!")
    .isNumeric()
    .withMessage("product quantity must be an number"),
  check("sold")
    .optional()
    .isNumeric()
    .withMessage("product quantity must be a number"),
  check("price")
    .notEmpty()
    .withMessage("price required!")
    .isNumeric()
    .withMessage("price must be a number")
    .isLength({ max: 32 })
    .withMessage("too long price!"),
  check("priceAfterDiscount")
    .optional()
    .isNumeric()
    .withMessage("price after discount Must be a number!")
    .toFloat()
    .custom((value, { req }) => {
      if (req.body.price <= value) {
        throw new Error(
          "price after discount must be lower than Original Price!"
        );
      }
      return true;
    }),
  check("colors")
    .optional()
    .isArray()
    .withMessage("colors should be an array of strings!"),
  check("images")
    .optional()
    .isArray()
    .withMessage("images should be an array of strings!"),
  check("category")
    .notEmpty()
    .withMessage("product must be belong to category!")
    .isMongoId()
    .withMessage("Invalid id formate!"),
  check("subcategory")
    .optional()
    .isMongoId()
    .withMessage("Invalid id formate!"),
  check("brand").optional().isMongoId().withMessage("Invalid id formate!"),
  check("ratingAverage")
    .optional()
    .isNumeric()
    .withMessage("rating average must be a number!")
    .isLength({ min: 1 })
    .withMessage("rating must be above or equal to 1!")
    .isLength({ min: 5 })
    .withMessage("rating must be below or equal to 5!"),
  check("imageCover").notEmpty().withMessage("image Cover required!"),
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
