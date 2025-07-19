import { Router } from "express";
import { Post, User } from "../models/index.js";
import { tokenExtractor } from "../util/middleware.js";

const router = Router();

const postFinder = async (req, res, next) => {
  req.post = await Post.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res, next) => {
  const posts = await Post.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["email", "username"],
    },
  });
  res.json(posts);
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const post = await Post.create({
      ...req.body,
      userId: user.id,
      date: new Date(),
    });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", postFinder, async (req, res) => {
  if (req.post) {
    res.json(req.post);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", postFinder, tokenExtractor, async (req, res) => {
  if (req.post && req.decodedToken.id === req.post.userId) {
    await req.post.destroy();
  }
  res.status(204).end();
});

export { router as postRouter };
