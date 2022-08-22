'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('stocks', [
      {
        item_id : 1,
        warehouse_id : 1,
        balance: 200
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('stocks', null, {});

  }
};
