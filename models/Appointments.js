const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
// Sincroniza os modelos com o banco de dados
sequelize.sync();

const Appointments = sequelize.define("appointments", {
  patientId: DataTypes.INTEGER,
  professionalId: DataTypes.INTEGER,
  procedureId: DataTypes.INTEGER,
  date: DataTypes.DATE,
  time: DataTypes.STRING,
  payed: DataTypes.BOOLEAN,
  value: DataTypes.DECIMAL,
  patientName: DataTypes.STRING,
  professionalName: DataTypes.STRING,
  procedureName: DataTypes.STRING,
});

module.exports = Appointments;
