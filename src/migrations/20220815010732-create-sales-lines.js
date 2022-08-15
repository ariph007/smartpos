'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales_lines', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.DOUBLE
      },
      created: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING
      },
      discountAmount: {
        type: Sequelize.DOUBLE
      },
      discountName: {
        type: Sequelize.STRING
      },
      discountValue: {
        type: Sequelize.FLOAT
      },
      unitPrice: {
        type: Sequelize.DOUBLE
      },
      item_id: {
        type: Sequelize.INTEGER
      },
      employee_id: {
        type: Sequelize.INTEGER
      },
      discount_id: {
        type: Sequelize.INTEGER
      },
      paymentMethod_id: {
        type: Sequelize.INTEGER
      },
      sales_id: {
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
    await queryInterface.dropTable('sales_lines');
  }
};