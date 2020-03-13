'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {});

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.parcel, {
      foreignKey: 'id',
      target: 'id',
      onDelete: "CASCADE"
    });
  };

  return user;
};