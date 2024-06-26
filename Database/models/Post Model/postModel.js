import { DataTypes } from "sequelize";
import { dbConn } from "../../dbConnection.js";

export const postModel = dbConn.define("post", {
  title: {
    type: DataTypes.STRING(100),
  },
  content: {
    type: DataTypes.STRING(100),
  },
});
