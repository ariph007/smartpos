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
      created: {
        type: Sequelize.STRING
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
      serviceChargeRate: {
        type: Sequelize.FLOAT
      },
      unitPrice: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
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
        allowNull: true,
        references: {
          model: "discounts",
          key: "id"
        },
        onDelete : "CASCADE"
      },
      sales_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sales",
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