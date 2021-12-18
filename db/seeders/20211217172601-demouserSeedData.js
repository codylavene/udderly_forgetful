'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      firstName: "Demo",
      lastName: "User",
      email: "demouser@gmail.com",
      hashedPassword: "$2a$10$C4Vk3a.5kTv3ajxC3kwp7.odwRckDeJx0PhOsynX1Rx7KI/8fDT8m",
      username: "demouser",
      createdAt: "Today, 09:36:42 -08",
      updatedAt: "Today, 09:36:42 -08"
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
