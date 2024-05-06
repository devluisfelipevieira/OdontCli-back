const Sequelize = require("sequelize");
const DATABASE_URL = require("../src/config/environment");

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
});

module.exports = sequelize;
