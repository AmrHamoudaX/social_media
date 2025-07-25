import express from "express";
import { postRouter } from "./controllers/posts.js";
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";
import { userRouter } from "./controllers/users.js";
import { loginRouter } from "./controllers/login.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(unknownEndpoint);
app.use(loggerError);

export { app };
