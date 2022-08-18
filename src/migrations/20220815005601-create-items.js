'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      image: {
        type: Sequelize.STRING,
      },
      openPrice: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      price1: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      price2: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      price3: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      purchased: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      purchasedToInventoryConversion: {
        type: Sequelize.FLOAT
      },
      purchasePrice: {
        type: Sequelize.FLOAT
      },
      purchaseUom: {
        type: Sequelize.STRING
      },
      recipeUom: {
        type: Sequelize.STRING
      },
      averageCost: {
        type: Sequelize.FLOAT
      },
      barcode: {
        type: Sequelize.STRING,
        unique: true
      },
      serviceCharge: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      tax: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      salesWarehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
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
    await queryInterface.dropTable('items');
  }
};