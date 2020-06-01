'use strict';

module.exports = (sequelize, DataTypes) => {
  const parcel = sequelize.define('parcel', {
    parcelName: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    pickupLocation: DataTypes.TEXT,
    deliveredOn: DataTypes.DATE,
    parcelStatus: DataTypes.TEXT,
    presentLocation: DataTypes.TEXT,
    parcelWeight: DataTypes.INTEGER,
    placeBy: DataTypes.TEXT,
    sentOn: DataTypes.DATE,
    parcelWeight: DataTypes.STRING
  }, {});

  parcel.associate = function (models) {
    parcel.hasOne(models.users, {
      foreignKey: 'parcelId',
      target: 'parcelId',
      onDelete: "CASCADE"
    });
  };

  return parcel;
};