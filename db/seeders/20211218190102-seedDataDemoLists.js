'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Lists', [
      {
        name: "Personal",
        userId: 1,
        createdAt: "Today, 09:36:42 -08",
        updatedAt: "Today, 09:36:42 -08"
      },
      {
        name: "Work",
        userId: 1,
        createdAt: "Today, 09:36:42 -08",
        updatedAt: "Today, 09:36:42 -08"
      }
    ], {});

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Lists', null, {});
  }
};
