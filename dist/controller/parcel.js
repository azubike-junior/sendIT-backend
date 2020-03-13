"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _models = _interopRequireDefault(require("../models"));

var _response = require("../helpers/response");

const {
  parcel
} = _models.default;

class ParcelController {
  static async getParcels(req, res, next) {
    try {
      const foundParcels = await parcel.findAll();

      if (!foundParcels) {
        return (0, _response.sendResponse)(res, {
          statusCode: 404,
          success: false,
          message: 'No parcel found',
          data: null
        });
      }

      return (0, _response.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'all parcels retrieved',
        data: foundParcels
      });
    } catch (e) {
      throw e;
    }
  }

  static async createParcel(req, res) {
    const {
      parcelName,
      destination,
      pickupLocation,
      presentLocation,
      parcelWeight,
      placedBy,
      parcelWeightScale
    } = req.body;

    try {
      let createdParcel = await parcel.create({
        parcelName,
        destination,
        pickupLocation,
        presentLocation,
        parcelWeight,
        placedBy,
        sentOn: new Date(),
        parcelWeightScale
      });

      if (createdParcel) {
        return (0, _response.sendResponse)(res, {
          statusCode: 200,
          success: true,
          message: 'parcel has been created successfully',
          data: createdParcel
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async getParcel(req, res, next) {
    const {
      parcelId
    } = req.params;

    try {
      const foundParcel = await parcels.findOne({
        where: {
          parcelId
        }
      });

      if (foundParcel) {
        return (0, _response.sendResponse)(res, {
          statusCode: 200,
          success: true,
          message: 'parcel retrieved',
          data: foundParcel
        });
      }

      return (0, _response.sendResponse)(res, {
        statusCode: 404,
        success: false,
        message: 'specific parcel does not exist',
        data: null
      });
    } catch (e) {
      throw e;
    }
  }

  static async cancelParcel(req, res, next) {
    const {
      parcelId
    } = req.params;
    const {
      parcelStatus
    } = req.body;

    try {
      const foundParcel = await parcels.findAll({
        where: {
          parcelId
        }
      });

      if (foundParcel.length > 0) {
        foundParcel.forEach(async parcel => {
          await parcel.update({
            parcelStatus
          });
        });
        return (0, _response.sendResponse)(res, {
          statusCode: 200,
          success: true,
          message: 'parcel has been cancelled',
          data: foundParcel
        });
      }

      return (0, _response.sendResponse)(res, {
        statusCode: 404,
        success: false,
        message: 'specific parcel does not exist',
        data: null
      });
    } catch (e) {
      throw e;
    }
  }

  static async changeParcelStatus(req, res, next) {
    const {
      parcelId
    } = req.params;
    const {
      parcelStatus
    } = req.body;

    try {
      const foundParcel = await parcels.findAll({
        where: {
          parcelId
        }
      });

      if (foundParcel.length > 0) {
        foundParcel.forEach(async parcel => {
          if (parcel.dataValues.parcelStatus === 'CANCELLED') {
            return (0, _response.sendResponse)(res, {
              statusCode: 404,
              success: false,
              message: 'parcel has already been canceled'
            });
          }

          await parcel.update({
            parcelStatus
          });
          return (0, _response.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'parcel status has been updated'
          });
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async changeDestination(req, res, next) {
    const {
      parcelId
    } = req.params;
    const {
      destination
    } = req.body;

    try {
      const foundParcel = await parcels.findAll({
        where: {
          parcelId
        }
      });

      if (foundParcel.length > 0) {
        foundParcel.forEach(async parcel => {
          if (parcel.dataValues.parcelStatus === 'DELIVERED') {
            return (0, _response.sendResponse)(res, {
              statusCode: 404,
              success: false,
              message: 'parcel has already been DELIVERED, so destination cant be changed'
            });
          }

          await parcel.update({
            destination
          });
          return (0, _response.sendResponse)(res, {
            statusCode: 200,
            success: true,
            message: 'parcel destination has been updated',
            data: foundParcel
          });
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async changePresentLocation(req, res, next) {
    const {
      parcelId
    } = req.params;
    const {
      presentLocation
    } = req.body;

    try {
      const foundParcel = await parcels.findAll({
        where: {
          parcelId
        }
      });

      if (foundParcel.length > 0) {
        foundParcel.forEach(async parcel => {
          await parcel.update({
            presentLocation
          });
        });
        return (0, _response.sendResponse)(res, {
          statusCode: 200,
          success: true,
          message: 'parcel presentLocation has been updated',
          data: foundParcel
        });
      }

      return (0, _response.sendResponse)(res, {
        statusCode: 404,
        success: false,
        message: 'specific parcel does not exist',
        data: null
      });
    } catch (e) {
      throw err;
    }
  }

}

exports.default = ParcelController;