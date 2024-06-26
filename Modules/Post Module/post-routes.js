import express from "express";
import {
  addPost,
  deletePost,
  getAllPostsForUser,
  getPost,
  updatePost,
} from "./post-controllers.js";
import { checkLoggedInUser, checkPostAuthor } from "./post-middleware.js";

export const postRouter = express.Router({ mergeParams: true }); // Enable merging of parent params

postRouter.get("/", checkLoggedInUser, getAllPostsForUser);
postRouter.post("/", checkLoggedInUser, addPost);
postRouter.get("/:postId", checkLoggedInUser, checkPostAuthor, getPost);
postRouter.put("/:postId", checkLoggedInUser, checkPostAuthor, updatePost);
postRouter.delete("/:postId", checkLoggedInUser, checkPostAuthor, deletePost);
