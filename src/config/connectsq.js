const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("nodejs_basic", "root", null, {
  host: "127.0.0.1",
  dialect: "mysql",
  port: 3306,
});
const testConnect = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = testConnect;
