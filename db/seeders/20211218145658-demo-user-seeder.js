"use strict";

const { sequelize } = require("../models");

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          firstName: "Demo",
          lastName: "User",
          email: "demo@demo.com",
          hashedPassword:
            "$2a$10$FBqeaWVLyUy5ANq2UIBjwuqTWHfNg77acA2qe.jHSjueCwalgKScO",
          username: "demo_user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Users", null, {});
  },
};
