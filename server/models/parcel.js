'use strict';
module.exports = (sequelize, DataTypes) => {
  const parcel = sequelize.define('parcel', {
    parcelId: DataTypes.INTEGER,
    parcelName: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    pickupLocation: DataTypes.TEXT,
    deliveredOn: DataTypes.DATE,
    parcelStatus: DataTypes.TEXT,
    presentLocation: DataTypes.TEXT,
    parcelWeight: DataTypes.INTEGER,
    placedBy: DataTypes.TEXT,
    sentOn: DataTypes.DATE,
    parcelWeightScale: DataTypes.INTEGER
  }, {});
  parcel.associate = function(models) {
    // associations can be defined here
  };
  return parcel;
};