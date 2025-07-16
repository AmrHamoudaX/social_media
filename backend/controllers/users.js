import { Router } from "express";
import { Post, User } from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Post,
      attributes: { exclude: ["userId"] },
    },
  });
  res.json(users);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Post,
      attributes: { exclude: ["userId"] },
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:name", async (req, res, next) => {
  try {
    req.user = await User.findOne({ where: { name: req.params.name } });
    req.user.name = req.body.name;
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    res.status(404).json({ error: error.message }).end();
    next(error);
  }
});

export { router as userRouter };
