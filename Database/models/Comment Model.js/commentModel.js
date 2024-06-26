import { DataTypes } from "sequelize";
import { dbConn } from "../../dbConnection.js";

export const commentModel = dbConn.define("comment", {
  content: {
    type: DataTypes.STRING(100),
  },
});
