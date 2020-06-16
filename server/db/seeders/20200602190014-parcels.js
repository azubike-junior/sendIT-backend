'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parcels', [{
        parcelName: "bed",
        destination: "lagos state, ikorodu, no 5 loau street",
        pickupLocation: "ikorodu turning",
        parcelStatus: "TRANSMITTING",
        parcelWeight: "333",
        parcelWeightScale: "kg",
      },
      {
        parcelName: "car",
        destination: "kaduna state, lawanawa",
        pickupLocation: "shahaa street",
        parcelWeight: "1000",
        parcelWeightScale: "kg",
      }, {
        parcelName: "laptop",
        destination: "malete, kwara state",
        pickupLocation: " ondo state, akure",
        parcelWeight: "333",
        parcelWeightScale: "kg",
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
