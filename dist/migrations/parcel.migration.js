"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("parcels", {
      parcelId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      parcelName: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      destination: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      pickupLocation: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      deliveredOn: {
        type: Sequelize.DATE
      },
      parcelStatus: {
        type: Sequelize.STRING
      },
      presentLocation: {
        type: Sequelize.TEXT
      },
      parcelWeight: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      placedBy: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      sentOn: {
        type: Sequelize.DATE
      },
      parcelWeightScale: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    }, {
      freezeTable: true
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.DropTable("parcels");
  }

};
exports.default = _default;