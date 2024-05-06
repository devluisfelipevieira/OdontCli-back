const { DataTypes } = require("sequelize");
const sequelize = require("../seeders/index");

const Patients = sequelize.define("patients", {
  name: DataTypes.STRING,
  bornDate: DataTypes.DATE,
  gender: DataTypes.STRING,
  cpf: DataTypes.STRING,
  city: DataTypes.STRING,
  phone: DataTypes.STRING,
  email: DataTypes.STRING,
});

module.exports = Patients;
