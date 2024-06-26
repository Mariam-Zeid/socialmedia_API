import { commentModel } from "../../Database/models/Comment Model.js/commentModel.js";
import { postModel } from "../../Database/models/Post Model/postModel.js";
import { userModel } from "../../Database/models/User Model/userModel.js";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  try {
    const result = await userModel.findAll();
    return res.json({ message: "Success", users: result });
  } catch (error) {
    return res.json({ error: error.message });
  }
};
export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      isLoggedIn: true,
    });
    res.status(201).send(user);
  } catch (error) {
    res.json({ error: error.message });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }
    await userModel.update({ isLoggedIn: true }, { where: { id: user.id } });
    res.status(200).send({ message: "Successfully logged in" });
  } catch (error) {
    res.status(400).send(error);
  }
};
export const userLogout = async (req, res) => {
  const { id } = req.query;
  const loginStatus = await userModel.update(
    { isLoggedIn: false },
    { where: { id } }
  );
  res.status(200).json({ message: "Successfully logged out", loginStatus });
};
export const getUserWithPostAndComments = async (req, res) => {
  const { userId, postId } = req.query;
  try {
    const user = await userModel.findByPk(userId, {
      attributes: ["name"],
      include: [
        {
          model: postModel,
          as: "posts",
          where: { id: postId },
          attributes: ["title", "content"],
          include: [
            {
              model: commentModel,
              as: "comments",
              attributes: ["content"],
            },
          ],
        },
      ],
    });
    console.log("Fetched User with Posts and Comments:", user);
    if (!user) {
      return res.status(404).json({ error: "User or post not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user with post and comments:", error);
    res.status(500).json({ error });
  }
};
