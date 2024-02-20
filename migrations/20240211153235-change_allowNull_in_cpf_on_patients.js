"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn("patients", "cpf", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn("patients", "cpf", {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: true,
    });
  },
};
