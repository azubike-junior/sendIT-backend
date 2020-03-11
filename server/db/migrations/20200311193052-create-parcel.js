'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parcels', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      parcelId: {
        type: Sequelize.INTEGER
      },
      parcelName: {
        type: Sequelize.TEXT
      },
      destination: {
        type: Sequelize.TEXT
      },
      pickupLocation: {
        type: Sequelize.TEXT
      },
      deliveredOn: {
        type: Sequelize.DATE
      },
      parcelStatus: {
        type: Sequelize.TEXT
      },
      presentLocation: {
        type: Sequelize.TEXT
      },
      parcelWeight: {
        type: Sequelize.INTEGER
      },
      placedBy: {
        type: Sequelize.TEXT
      },
      sentOn: {
        type: Sequelize.DATE
      },
      parcelWeightScale: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parcels');
  }
};