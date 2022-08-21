'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('warehouses', [
      {
        active: true,
        code: "UTM",
        name: "GUDANG UTAMA",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('warehouses', null, {});
  }
};
