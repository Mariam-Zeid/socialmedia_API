import { commentModel } from "../../Database/models/Comment Model.js/commentModel.js";

export const getAllComments = async (req, res) => {
  try {
    const comments = await commentModel.findAll({
      where: { postId: req.params.postId, authorId: req.params.userId },
    });
    res.json({ message: "Success", comments });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const addComment = async (req, res) => {
  try {
    const comment = await commentModel.create({
      ...req.body,
      postId: req.params.postId,
      authorId: req.params.userId,
    });
    res.status(201).json({ message: "Comment created successfully", comment });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await commentModel.findByPk(commentId);
    await comment.update({ ...req.body });
    return res.json({ message: "Comment updated successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await commentModel.findByPk(commentId);
    await comment.destroy();
    return res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
};
