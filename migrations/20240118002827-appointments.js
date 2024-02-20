"use strict";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("appointments", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      dateHour: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      payed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      patientId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
      },
      professionalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "professionals",
          key: "id",
        },
      },
      procedureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "procedures",
          key: "id",
        },
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("appointments");
  },
};
