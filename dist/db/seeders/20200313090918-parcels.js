'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('parcels', [{
      parcelName: 'John Doe',
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
    }], {});
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