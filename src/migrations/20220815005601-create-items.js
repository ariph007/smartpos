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
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      image: {
        type: Sequelize.STRING
      },
      openPrice: {
        type: Sequelize.BOOLEAN
      },
      price1: {
        type: Sequelize.DOUBLE
      },
      price2: {
        type: Sequelize.DOUBLE
      },
      price3: {
        type: Sequelize.DOUBLE
      },
      purchased: {
        type: Sequelize.BOOLEAN
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
        type: Sequelize.STRING
      },
      serviceCharge: {
        type: Sequelize.BOOLEAN
      },
      tax: {
        type: Sequelize.BOOLEAN
      },
      category_id: {
        type: Sequelize.INTEGER
      },
      salesWarehouse_id: {
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
    await queryInterface.dropTable('items');
  }
};