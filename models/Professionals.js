const { DataTypes } = require("sequelize");
const sequelize = require("../seeders/index");

const Professionals = sequelize.define("professionals", {
  name: DataTypes.STRING,
  gender: DataTypes.STRING,
  cro: DataTypes.STRING,
  specialty: DataTypes.ARRAY(DataTypes.STRING),
  phone: DataTypes.ARRAY(DataTypes.STRING),
  email: DataTypes.STRING,
});

module.exports = Professionals;
