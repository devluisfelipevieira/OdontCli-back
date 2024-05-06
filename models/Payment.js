const { DataTypes } = require("sequelize");
const sequelize = require("../seeders/index");

const Payment = sequelize.define("payment", {
  appointmentId: DataTypes.INTEGER,
  payDate: DataTypes.DATE,
  priceToPay: DataTypes.DECIMAL,
  payMethod: DataTypes.STRING,
});

module.exports = Payment;
