'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('tables', [
      {
        capacity: 2,
        height: 50,
        width: 200,
        x: 625,
        y: 20,
        name: 'KASIR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 100,
        y: 20,
        name: 'TBL 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 100,
        y: 100,
        name: 'TBL 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 100,
        y: 180,
        name: 'TBL 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 300,
        y: 80,
        name: 'TBL 4',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 300,
        y: -200,
        name: 'TBL 5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 300,
        y: -480,
        name: 'TBL 6',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 1180,
        y: -580,
        name: 'TBL 7',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 1180,
        y: -500,
        name: 'TBL 8',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 1180,
        y: -420,
        name: 'TBL 9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 540,
        y: -520,
        name: 'VIP 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        capacity: 2,
        height: 100,
        width: 100,
        x: 540,
        y: -800,
        name: 'VIP 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tables', null, {});

  }
};