'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('users', {
    firstName: DataTypes.TEXT,
    lastName: DataTypes.TEXT,
    email: DataTypes.TEXT,
    password: DataTypes.TEXT,
    isAdmin: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    timestamps: false
  });

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.parcel, {
      foreignKey: 'parcelId',
      target: 'parcelId',
      onDelete: "CASCADE"
    });
  };

  return user;
};