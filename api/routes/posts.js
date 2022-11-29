const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

// CREATE
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// UPDATE
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (error) {
        return res.status(401).json("You can only update your posts");
      }
    } else {
      return res.status(401).json("You can only update your posts");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("post deleted");
      } catch (error) {
        return res.status(401).json("You can only delete your posts");
      }
    } else {
      return res.status(401).json("You can only delete your posts");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json(error);
  }
});

// GET ALL POSTS FROM USER
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

// GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname],
        },
      });
    } else {
      posts = await Post.find();
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
