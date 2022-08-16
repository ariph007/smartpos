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
        type: Sequelize.DOUBLE,
        allowNull:false
      },
      created: {
        type: Sequelize.DATE
      },
      description: {
        type: Sequelize.STRING,
        allowNull:false
      },
      discountAmount: {
        type: Sequelize.DOUBLE,
      },
      discountName: {
        type: Sequelize.STRING
      },
      discountValue: {
        type: Sequelize.FLOAT
      },
      unitPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: "id"
        },
        onDelete : "CASCADE"
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "id"
        },
        onDelete : "CASCADE"
      },
      discount_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "discounts",
          key: "id"
        },
        onDelete : "CASCADE"
      },
      paymentMethod_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sales_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "payment_methods",
          key: "id"
        },
        onDelete : "CASCADE"
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