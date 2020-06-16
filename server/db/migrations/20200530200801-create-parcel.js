'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('parcels', {
      parcelId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
        type: Sequelize.TEXT,
        defaultValue: 'PLACED'
      },
      presentLocation: {
        type: Sequelize.TEXT
      },
      parcelWeight: {
        type: Sequelize.INTEGER
      },
      placeBy: {
        type: Sequelize.TEXT
      },
      sentOn: {
        type: Sequelize.DATE
      },
      parcelWeightScale: {
        type: Sequelize.STRING
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('parcels');
  }
};