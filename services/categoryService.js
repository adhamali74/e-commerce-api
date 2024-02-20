/** @format */
const categoryModel = require("../models/categoryModel");

exports.getCategories = (req, res) => {
  const name = req.body.name;
  const newCategory = new categoryModel({ name });
  newCategory
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
    });
};
