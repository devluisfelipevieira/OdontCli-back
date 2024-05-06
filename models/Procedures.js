const { DataTypes } = require("sequelize");
const sequelize = require("../seeders/index");

const Procedures = sequelize.define("procedures", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.DECIMAL,
});

module.exports = Procedures;
