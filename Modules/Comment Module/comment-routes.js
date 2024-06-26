import express from "express";
import {
  addComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "./comment-controller.js";
import {
  checkLoggedInUser,
  checkPostAuthor,
} from "../Post Module/post-middleware.js";

export const commentRouter = express.Router({ mergeParams: true }); // Enable merging of parent params

commentRouter.get("/", checkLoggedInUser, checkPostAuthor, getAllComments);
commentRouter.post("/", checkLoggedInUser, checkPostAuthor, addComment);
commentRouter.put(
  "/:commentId",
  checkLoggedInUser,
  checkPostAuthor,
  updateComment
);
commentRouter.delete(
  "/:commentId",
  checkLoggedInUser,
  checkPostAuthor,
  deleteComment
);
