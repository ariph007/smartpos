'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('payment_methods', [
      {
        active: true,
        additionalCharge : 0,
        noSales: false,
        noTax : false,
        noServiceCharge: false,
        type: "cash",
        name: "Cash",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        additionalCharge : 0,
        noSales: false,
        noTax : false,
        noServiceCharge: false,
        type: "entertainment",
        name: "Give Away",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
  }
};
