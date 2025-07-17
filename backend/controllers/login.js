import * as jwt from "jsonwebtoken";
import { SECRET } from "../util/config.js";
import { User } from "../models/index.js";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();

router.post("/", async (req, res) => {
  const body = req.body;

  const user = await User.findOne({
    where: {
      email: body.email,
    },
  });

  const passwordCorrect = await bcrypt.compare(body.password, user.password);

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.default.sign(userForToken, SECRET);

  res.status(200).send({ token, username: user.username, email: user.email });
});

export { router as loginRouter };
