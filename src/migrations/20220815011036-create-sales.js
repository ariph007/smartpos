'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      closedTime: {
        type: Sequelize.DATE
      },
      created: {
        type: Sequelize.DATE
      },
      CustomerName: {
        type: Sequelize.STRING
      },
      discountAmount: {
        type: Sequelize.DOUBLE
      },
      extraCharge: {
        type: Sequelize.DOUBLE
      },
      rounding: {
        type: Sequelize.BOOLEAN
      },
      subtotal: {
        type: Sequelize.DOUBLE
      },
      total: {
        type: Sequelize.DOUBLE
      },
      invoice_id: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('sales');
  }
};