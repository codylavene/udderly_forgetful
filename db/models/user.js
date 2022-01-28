"use strict";
module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			firstName: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			lastName: {
				type: DataTypes.STRING(100),
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				unique: true,
				allowNull: false,
			},
			hashedPassword: {
				type: DataTypes.STRING.BINARY,
				allowNull: false,
			},
			username: {
				type: DataTypes.STRING(100),
				allowNull: false,
				unique: true,
			},
		},
		{}
	);

	User.associate = function (models) {
		User.hasMany(models.List, { foreignKey: "userId" });
		User.hasMany(models.Task, { foreignKey: "userId" });
	};
	return User;
};
