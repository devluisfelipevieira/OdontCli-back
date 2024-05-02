"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.addColumn("appointments", "patientName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("appointments", "professionalName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    queryInterface.addColumn("appointments", "procedureName", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    queryInterface.removeColumn("appointments", "patientName");
    queryInterface.removeColumn("appointments", "professionalName");
    queryInterface.removeColumn("appointments", "procedureName");
  },
};
