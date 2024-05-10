import express from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostCounts,
  updatePost,
} from "../controllers/postController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/posts", authMiddleware, createPost);
router.get("/posts", authMiddleware, getAllPosts);
router.put("/posts/:id", authMiddleware, updatePost);
router.delete("/posts/:id", authMiddleware, deletePost);
router.get("/posts/dashboard", getPostCounts);

export default router;
