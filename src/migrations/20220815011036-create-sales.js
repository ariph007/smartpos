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
        type: Sequelize.DATE,
      },
      created: {
        type: Sequelize.DATE,
        allowNull: false
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
        type: Sequelize.BOOLEAN,
        allowNull:false
      },
      subtotal: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      total: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      invoice_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : {
          model: "invoices",
          key: "id"
        },
        onDelete: "CASCADE"
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