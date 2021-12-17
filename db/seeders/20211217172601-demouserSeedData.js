'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
      firstName: "Demo",
      lastName: "User",
      email: "demo@gmail.com",
      hashedPassword: "$2a$10$0VD7XCUD3MKIM4FirbQsDuhaGp9AvcYRV2pxbGeQ48DDYr51lSWzW",
      username: "Demo-User",
      createdAt: "Today, 09:36:42 -08",
      updatedAt: "Today, 09:36:42 -08"
    }], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Users', null, {});
  }
};
