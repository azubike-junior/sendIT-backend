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
      imageUrl: DataTypes.STRING,
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
    user.hasMany(models.parcel, {
      foreignKey: "placeBy",
      target: "userId",
      onDelete: "CASCADE",
    });
  }
  user.prototype.updateImage = async function (newImage) {
    this.imageUrl = newImage
    await this.save()
    return this
  }
  
  return user;
};
