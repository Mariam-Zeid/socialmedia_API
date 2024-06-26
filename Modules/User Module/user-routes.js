import express from "express";
import {
  getAllUsers,
  getUserWithPostAndComments,
  userLogin,
  userLogout,
  userSignup,
} from "./user-controllers.js";
import { checkUserEmail } from "./user-middleware.js";

export const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", checkUserEmail, userSignup);
userRouter.put("/login", userLogin);
userRouter.put("/logout", userLogout);
userRouter.get("/user-details", getUserWithPostAndComments);
