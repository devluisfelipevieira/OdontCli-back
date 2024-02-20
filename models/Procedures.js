const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Procedures = sequelize.define("procedures", {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  price: DataTypes.DECIMAL,
});

module.exports = Procedures;
