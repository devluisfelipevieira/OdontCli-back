"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "patients",
          key: "id",
        },
      },
      professionalId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "professionals",
          key: "id",
        },
      },
      procedureId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "procedures",
          key: "id",
        },
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      time: {
        allowNull: false,
        type: Sequelize.TIME,
        time: true,
      },
      payed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      value: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("appointments");
  },
};
