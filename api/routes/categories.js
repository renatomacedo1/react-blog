const router = require("express").Router();
const { response } = require("express");
const Category = require("../models/Category");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  console.log("newCat" + newCat);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//Insert many
router.post("/many/", async (req, res) => {
  const array = req.body.array;

  try {
    Category.insertMany(array)
      .then(function (docs) {
        response.json(docs);
      })
      .catch(function (err) {
        response.status(500).send(err);
      });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
