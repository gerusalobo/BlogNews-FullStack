import express from "express"
import {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost,
    uploadAuth
  } from "../controllers/post.controller.js";
  import { requireAuth } from "@clerk/express";


const router = express.Router()

router.get("/upload-auth", uploadAuth);

router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", requireAuth(), createPost);
router.delete("/:id", requireAuth(), deletePost);
router.post("/:id", requireAuth(), updatePost);


export default router 