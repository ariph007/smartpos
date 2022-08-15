'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      companyName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      rounding: {
        type: Sequelize.FLOAT
      },
      serviceChargeRate: {
        type: Sequelize.FLOAT
      },
      taxRate: {
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('settings');
  }
};