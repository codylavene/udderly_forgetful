'use strict';
module.exports = (sequelize, DataTypes) => {
  const List = sequelize.define('List', {
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {});
  List.associate = function(models) {
    List.belongsTo(models.User, { foreignKey: "userId" })
    List.hasMany(models.Task, {foreignKey: "taskId" })
  };
  return List;
};
