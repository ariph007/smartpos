'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('discounts', [
      {
        active: true,
        amount: true,
        name: "DISC 50K",
        value: 50000,
        department1_id: null,
        department2_id: null,
        department3_id: null,
        category1_id: 2,
        category2_id: null,
        category3_id: null,
        item1_id: null,
        item2_id: null,
        item3_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        amount: false,
        name: "DISC 10%",
        value: 10,
        department1_id: null,
        department2_id: null,
        department3_id: null,
        category1_id: 1,
        category2_id: null,
        category3_id: null,
        item1_id: null,
        item2_id: null,
        item3_id: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('discounts', null, {});
  }
};
