import express from "express";
import { postRouter } from "./controllers/posts.js";
import { logger, unknownEndpoint } from "./util/middleware.js";
import { loggerError } from "./util/logger.js";

const app = express();

app.use(express.json());
app.use(logger);
app.use("/api/posts", postRouter);

app.use(unknownEndpoint);
app.use(loggerError);

export { app };
