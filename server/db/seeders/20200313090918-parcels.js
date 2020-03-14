'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('parcels', [{
        parcelName: "bed",
        destination: "lagos state, ikorodu, no 5 loau street",
        destination: "lagos state, iyano paja, oshodi",
        pickupLocation: "ikorodu turning",
        deliveredOn: "2018-11-18",
        parcelStatus: "TRANSMITTING",
        parcelWeight: "333",
        placedBy: "20",
        parcelWeightScale: "kg",
        sentOn: "2018-11-18",
        presentLocation: "isale oja, mowe, ajegunle"
      },
      {
        parcelName: "car",
        destination: "kaduna state, lawanawa",
        pickupLocation: "shahaa street",
        deliveredOn: "2018-11-18",
        parcelStatus: "TRANSMITTING",
        parcelWeight: "1000",
        placedBy: "20",
        parcelWeightScale: "kg",
        sentOn: "2018-11-18",
        presentLocation: "ananaje lawal ondo state"
      }, {
        parcelName: "laptop",
        destination: "malete, kwara state",
        pickupLocation: " ondo state, akure",
        deliveredOn: "2018-11-18",
        parcelStatus: "TRANSMITTING",
        parcelWeight: "333",
        placedBy: "20",
        parcelWeightScale: "kg",
        sentOn: "2018-11-18",
        presentLocation: "isale oja, mowe, ajegunle"
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('parcels', null, {});
  }
};