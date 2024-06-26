import { Sequelize } from "sequelize";

export const dbConn = new Sequelize(
  "mysql://ufvmh3qzyueqcr2l:rOjW2PaY3Zi4BqCTVA4n@bku8azb4x4wpmxgteogy-mysql.services.clever-cloud.com:3306/bku8azb4x4wpmxgteogy"
);

dbConn
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
