/** @format */
const categoryModel = require("../models/categoryModel");
const slugify = require("slugify");

exports.getCategories = (req, res) => {
  res.send();
};

exports.createCategories = (req, res) => {
  const name = req.body.name;
  categoryModel
    .create({ name, slug: slugify(name) })
    .then((category) => res.status(201).json({ data: category }))
    .catch((error) => res.status(400).send({ error: error }));
};
