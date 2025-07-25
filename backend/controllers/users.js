import { Router } from "express";
import { Post, Team, User } from "../models/index.js";
import bcrypt from "bcrypt";
import { tokenExtractor } from "../util/middleware.js";

const router = Router();

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Post,
        attributes: { exclude: ["userId"] },
      },
      {
        model: Team,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  res.json(users);
});

router.get("/admins", async (req, res) => {
  const adminUsers = await User.scope("admin").findAll();
  res.json(adminUsers);
});

router.get("/disabled", async (req, res) => {
  const disabledUsers = await User.scope("disabled").findAll();
  res.json(disabledUsers);
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.build(req.body);
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(req.body.password, saltRounds);
    user.password = passwordHash;
    await user.save();
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
  if (!user) {
    res.status(404).end();
  }
  let teams = undefined;
  if (req.query.teams) {
    teams = await user.getTeams({
      attributes: ["name"],
      joinTableAttributes: [],
    });
  }
  res.json({ ...user.toJSON(), teams });
});

const isAdmin = async (req, res, next) => {
  const user = await User.findByPk(req.decodedToken.id);
  if (!user.admin) {
    return res.status(401).json({ error: "operation not allowed" });
  }
  next();
};

router.put("/:username", tokenExtractor, isAdmin, async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.params.username,
    },
  });

  if (user) {
    user.disabled = req.body.disabled;
    await user.save();
    res.json(user);
  } else {
    console.log(`im user: ${user}`);
    res.status(404).end();
  }
});

export { router as userRouter };
