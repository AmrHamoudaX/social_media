import { Router } from "express";
import { Post } from "../models/index.js";

const router = Router();

const postFinder = async (req, res, next) => {
    req.post = await Post.findByPk(req.params.id);
    next();
};

router.get("/", async (req, res) => {
    const posts = await Post.findAll();
    res.json(posts);
});

router.post("/", async (req, res, next) => {
    try {
        const post = await Post.create({
            ...req.body,
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

router.delete("/:id", postFinder, async (req, res) => {
    if (req.post) {
        await req.post.destroy();
    }
    res.status(204).end();
});

export { router as postRouter };
