'use strict';
const bcrypt = require('bcryptjs');
// const hashedPassword = bcrypt.hashSync(password, 10);
const hashedPassword = (password) =>{
  return bcrypt.hashSync(password,10)
};

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('employees', [
      {
        active: true,
        jobTitle: "Manajer",
        joined: new Date(),
        name: "Eko",
        email: "eko@mail.com",
        role: "manager",
        password: hashedPassword("888888"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        active: true,
        jobTitle: "Cashier",
        joined: "2022-08-19",
        name: "Nurul",
        email: "nurul@mail.com",
        role: "cashier",
        password: hashedPassword("111111"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('employees', null, {});
  }
};
