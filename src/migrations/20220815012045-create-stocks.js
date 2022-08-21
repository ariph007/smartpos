'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      balance: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      warehouse_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "warehouses",
          key: "id"
        },
        onDelete: 'CASCADE',
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "items",
          key: "id"
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('stocks');
  }
};