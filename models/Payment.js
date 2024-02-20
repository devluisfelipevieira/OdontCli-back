const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Payment = sequelize.define("payment", {
  appointmentId: DataTypes.INTEGER,
  payDate: DataTypes.DATE,
  priceToPay: DataTypes.DECIMAL,
  payMethod: DataTypes.STRING,
});

module.exports = Payment;
