"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cars", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NameCar: {
        type: Sequelize.STRING,
      },
      MperGalon: {
        type: Sequelize.INTEGER,
      },
      Cylinders: {
        type: Sequelize.INTEGER,
      },
      Horsepower: {
        type: Sequelize.INTEGER,
      },
      Weight: {
        type: Sequelize.INTEGER,
      },
      Acceleration: {
        type: Sequelize.FLOAT,
      },
      Year: {
        type: Sequelize.STRING,
      },
      Origin: {
        type: Sequelize.STRING,
      },
      Code: {
        type: Sequelize.STRING,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cars");
  },
};
