import { userModel } from "../../Database/models/User Model/userModel.js";

export const checkUserEmail = async (req, res, next) => {
  try {
    const result = await userModel.findOne({
      where: { email: req.body.email },
    });
    if (result) {
      return res.status(409).json({ message: "User already exists" });
    }
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
