'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('settings', [
      {
        companyName : "SmartPOS",
        address : "Jl.Jendral Sudirman, Pekanbaru",
        logo: "smartpos.jpg",
        phone: "08137123123",
        rounding: 100,
        serviceChargeRate: 5,
        taxRate: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('settings', null, {});

  }
};
