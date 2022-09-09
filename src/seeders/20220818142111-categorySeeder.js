'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [
      {
        active: true,
        code: "APP",
        name: "APPERTIZER",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "SAL",
        name: "SALAD",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "PIZ",
        name: "PIZZA",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "PAS",
        name: "PASTA",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "STE",
        name: "STEAK",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "SOU",
        name: "SOUP",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "TEA",
        name: "TEA",
        department_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "COF",
        name: "COFFEE",
        department_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "MIL",
        name: "MILKSHAKE",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "JUI",
        name: "JUICE",
        department_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "INV",
        name: "INVENTORY",
        department_id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "SOD",
        name: "SODA",
        department_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        code: "CIG",
        name: "CIGARETTE",
        department_id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
