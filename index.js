import express from "express";
import { dbConn } from "./Database/dbConnection.js";
import { userRouter } from "./Modules/User Module/user-routes.js";
import { postRouter } from "./Modules/Post Module/post-routes.js";
import { commentRouter } from "./Modules/Comment Module/comment-routes.js";

// Migration
dbConn
  .sync({ alter: true })
  .then(() => {
    console.log("Database and tables created successfully.");
  })
  .catch((error) => {
    console.error("Unable to create database tables:", error);
  });

const app = express();
app.use(express.json());
const port = 8080;

app.use("/users", userRouter);
app.use("/users/:userId/posts", postRouter);
app.use("/users/:userId/posts/:postId/comments", commentRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
