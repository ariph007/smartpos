'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        code: "IDF",
        name: "INDONESIA FOOD",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        code: "CFE",
        name: "COFFEE",
        department_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
