import express from "express"
import {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
  } from "../controllers/post.controller.js";

const router = express.Router()

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.post("/:id", updatePost);

export default router 