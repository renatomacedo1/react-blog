const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");

// UPDATE
router.patch("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else {
    return res.status(401).json("You can only update your account");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("User has been deleted with posts");
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    } catch (error) {
      return res.status(404).json("User not found");
    }
  } else {
    return res.status(401).json("You can only update your account");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    //const {password, profilePicture, createdAt, updatedAt, __v} = users
    const newUsers = [];
    users.forEach((item) => {
      const object = {
        id: item._id,
        username: item.username,
        email: item.email,
      };
      newUsers.push(object);
    });
    return res.status(200).json(newUsers);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
