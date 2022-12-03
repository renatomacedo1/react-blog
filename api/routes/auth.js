const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      console.log("Wrong credentials 1");
      return res.status(400).json("Wrong credentials");
    }

    const validate = await bcrypt.compare(req.body.password, user.password);

    if (!validate) {
      console.log("Wrong credentials 2");
      return res.status(400).json("Wrong credentials");
    }

    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (error) {
    console.log(error);
    return res.status(500).json("There was a server error");
  }
});

module.exports = router;
