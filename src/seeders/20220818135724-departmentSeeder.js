'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      {
        code: "FOOD",
        active: true,
        name: "FOOD",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "BEVERAGE",
        active: true,
        name: "BEVERAGE",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
