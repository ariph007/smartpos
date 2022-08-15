'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      amount: {
        type: Sequelize.BOOLEAN
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.FLOAT
      },
      department1_id: {
        type: Sequelize.INTEGER
      },
      department2_id: {
        type: Sequelize.INTEGER
      },
      department3_id: {
        type: Sequelize.INTEGER
      },
      category1_id: {
        type: Sequelize.INTEGER
      },
      category2_id: {
        type: Sequelize.INTEGER
      },
      category3_id: {
        type: Sequelize.INTEGER
      },
      item1_id: {
        type: Sequelize.INTEGER
      },
      item2_id: {
        type: Sequelize.INTEGER
      },
      item3_id: {
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
    await queryInterface.dropTable('discounts');
  }
};