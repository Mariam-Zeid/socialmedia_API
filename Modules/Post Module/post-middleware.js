import { postModel } from "../../Database/models/Post Model/postModel.js";
import { userModel } from "../../Database/models/User Model/userModel.js";

export const checkLoggedInUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    if (!user.isLoggedIn) {
      return res.status(401).json({ message: "User is not logged in" });
    }
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const checkPostAuthor = async (req, res, next) => {
  try {
    const { userId, postId } = req.params;
    const post = await postModel.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (+userId !== post.authorId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
