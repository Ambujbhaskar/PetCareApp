const express = require("express");
const router = express.Router();
const { Article, User } = require("../models");

router.get("/", async (req, res, next) => {
  try {
    const articles = await Article.find({});
    res.status(200).json(articles);
  } catch (err) {
    next(err);
  }
});

router.post("/:id", async (req, res, next) => {
  const articleId = req.params.id;
  const userId = req.user_id;
  console.log(articleId, userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(user);

    const savedArticles = user.saved_articles;
    if (savedArticles.includes(articleId)) {
      return res.status(400).json({ message: "Article already saved" });
    }

    savedArticles.push(articleId);
    await user.save();

    res.status(200).json(user.saved_articles);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res) => {
  const articleId = req.params.id;
  const userId = req.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const savedArticles = user.saved_articles;
    const articleIndex = savedArticles.indexOf(articleId);
    if (articleIndex === -1) {
      return res.status(400).json({ message: "Article not saved" });
    }

    savedArticles.splice(articleIndex, 1);
    await user.save();

    res.status(200).json(user.saved_articles);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
