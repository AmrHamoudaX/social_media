import express from "express";
import { postRouter } from "./controllers/posts.js";

const app = express();

app.use(express.json());
app.use("/api/posts", postRouter);

export { app };
