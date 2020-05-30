'use strict';
module.exports = (sequelize, DataTypes) => {
  const parcel = sequelize.define('parcel', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    parcelName: DataTypes.TEXT,
    destination: DataTypes.TEXT,
    pickupLocation: DataTypes.TEXT,
    deliveredOn: DataTypes.DATE,
    parcelStatus: DataTypes.TEXT,
    presentLocation: DataTypes.TEXT,
    parcelWeight: DataTypes.INTEGER,
    placedBy: DataTypes.TEXT,
    sentOn: DataTypes.DATE,
    parcelWeightScale: DataTypes.TEXT
  }, {
    freezeTableName: true,
    timestamps: false
  });
  parcel.associate = function (models) {
    parcel.belongsTo(models.user, {
      foreignKey: 'id',
      target: 'id',
      onDelete: "CASCADE"
    })
  };
  return parcel;
};