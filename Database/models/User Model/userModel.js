import { DataTypes } from "sequelize";
import { dbConn } from "../../dbConnection.js";
import { postModel } from "../Post Model/postModel.js";
import { commentModel } from "../Comment Model.js/commentModel.js";

export const userModel = dbConn.define("user", {
  name: {
    type: DataTypes.STRING(100),
  },
  email: {
    type: DataTypes.STRING(250),
    unique: true, // Ensure this is the only unique constraint on the table
  },
  password: {
    type: DataTypes.STRING(250),
  },
  isLoggedIn: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

userModel.hasMany(postModel, { foreignKey: "authorId" });
postModel.belongsTo(userModel, { as: "author", foreignKey: "authorId" });
postModel.hasMany(commentModel, { as: "comments", foreignKey: "postId" });
commentModel.belongsTo(postModel, { as: "post", foreignKey: "postId" });
commentModel.belongsTo(userModel, { as: "user", foreignKey: "authorId" });
