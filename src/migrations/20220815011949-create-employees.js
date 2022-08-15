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
        type: Sequelize.BOOLEAN
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      joined: {
        type: Sequelize.DATEONLY
      },
      name: {
        type: Sequelize.STRING
      },
      pin: {
        type: Sequelize.STRING
      },
      role: {
				type: Sequelize.ENUM('manager', 'cashier'),
				allowNull: false,
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