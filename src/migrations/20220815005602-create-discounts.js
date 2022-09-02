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
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      amount: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      subtotal: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      value: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0
      },
      department1_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      department2_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments",
          key : "id"
        },
        onDelete: "CASCADE"
      },
      department3_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "departments",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      category1_id: {
        type: Sequelize.INTEGER,
        references: {
          model : "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      category2_id: {
        type: Sequelize.INTEGER,
        references: {
          model : "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      category3_id: {
        type: Sequelize.INTEGER,
        references: {
          model : "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      item1_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      item2_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      item3_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "items",
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
    await queryInterface.dropTable('discounts');
  }
};