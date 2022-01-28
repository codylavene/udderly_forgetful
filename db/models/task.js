"use strict";
module.exports = (sequelize, DataTypes) => {
	const Task = sequelize.define(
		"Task",
		{
			description: {
				type: DataTypes.TEXT,
			},
			listId: {
				type: DataTypes.INTEGER,
			},
			userId: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			completed: {
				defaultValue: false,
				type: DataTypes.BOOLEAN,
				allowNull: false,
			},

			dueAt: {
				type: DataTypes.DATE,
			},
		},
		{}
	);
	Task.associate = function (models) {
		Task.belongsTo(models.List, { foreignKey: "listId" });
		Task.belongsTo(models.User, { foreignKey: "userId" });
	};
	return Task;
};
