'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      joined: {
        type: Sequelize.DATEONLY
      },
      name: {
        type: Sequelize.STRING,
        unique: true
      },
      pin: {
        type: Sequelize.STRING,
        unique: true
      },
      role: {
				type: Sequelize.ENUM('manager', 'cashier'),
				allowNull: false,
        defaultValue: "cashier"
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
    await queryInterface.dropTable('employees');
  }
};