import { postModel } from "../../Database/models/Post Model/postModel.js";
import { userModel } from "../../Database/models/User Model/userModel.js";

export const getAllPostsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await postModel.findAll({
      where: { authorId: userId },
    });
    res.json({ message: "Success", userId, posts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const addPost = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await userModel.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const post = await postModel.create({
      ...req.body,
      authorId: userId,
    });

    res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
export const getPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findByPk(postId, {
      attributes: ["title", "content"],
      include: [
        {
          model: userModel,
          as: "author",
          attributes: ["name"],
        },
      ],
    });
    res.json({ message: "Success", post });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findByPk(postId);
    await post.update({ ...req.body });
    return res.json({ message: "Post updated successfully", post });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await postModel.findByPk(postId);
    await post.destroy();
    return res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
