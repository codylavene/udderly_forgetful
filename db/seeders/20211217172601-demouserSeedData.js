"use strict";

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert(
			"Users",
			[
				{
					firstName: "Demo",
					lastName: "User",
					email: "demouser@gmail.com",
					hashedPassword:
						"$2a$10$C4Vk3a.5kTv3ajxC3kwp7.odwRckDeJx0PhOsynX1Rx7KI/8fDT8m",
					username: "demouser",
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete("Users", null, {});
	},
};
