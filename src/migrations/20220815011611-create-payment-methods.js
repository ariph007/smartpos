'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_methods', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      additionalCharge: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      noSales: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      noTax: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      noServiceCharge: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_methods');
  }
};