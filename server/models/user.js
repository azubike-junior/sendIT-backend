"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users",
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.TEXT,
      lastName: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
    }
  );

  user.associate = function (models) {
    // associations can be defined here
    user.hasMany(models.parcel, {
      foreignKey: "placeBy",
      target: "userId",
      onDelete: "CASCADE",
    });
  };

  return user;
};
