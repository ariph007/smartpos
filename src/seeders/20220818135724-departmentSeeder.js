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
        code: "BEVERAGES",
        active: true,
        name: "BEVERAGES",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "MODIFIER",
        active: true,
        name: "MODIFIER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "INVENTORY",
        active: true,
        name: "INVENTORY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "RETAIL",
        active: true,
        name: "RETAIL",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
  }
};
