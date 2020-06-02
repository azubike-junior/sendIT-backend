"use strict";
module.exports = (sequelize, DataTypes) => {
  const parcel = sequelize.define(
    "parcel",
    {
      parcelId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      parcelName: DataTypes.TEXT,
      destination: DataTypes.TEXT,
      pickupLocation: DataTypes.TEXT,
      deliveredOn: DataTypes.DATE,
      parcelStatus: DataTypes.TEXT,
      presentLocation: DataTypes.TEXT,
      parcelWeight: DataTypes.INTEGER,
      sentOn: DataTypes.DATE,
      parcelWeight: DataTypes.STRING,
    },
    { timestamps: false }
  );
  parcel.associate = function (models) {
    parcel.belongsTo(models.users, {
      foreignKey: "placeBy",
      target: "userId",
      onDelete: "CASCADE",
    });
  };
  return parcel;
};
