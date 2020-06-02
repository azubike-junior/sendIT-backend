import models from "../models";
import { sendResponse } from "../helpers/response";

const { parcel } = models;

// console.log("parcel0", models)
export default class ParcelController {
  static async getParcels(req, res, next) {
    try {
      const foundParcels = await models.parcel.findAll();
      console.log(foundParcels);
      if (!foundParcels) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: "No parcel found",
          data: null,
        });
      }
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "all parcels retrieved",
        data: foundParcels,
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
    }
  }
  static async createParcel(req, res) {
    try {
      const {
        body: {
          parcelName,
          destination,
          pickupLocation,
          presentLocation,
          parcelStatus,
          parcelWeight,
          placedBy,
          parcelWeightScale,
        },
        user,
      } = req;

      let createdParcel = await parcel.create({
        parcelName,
        destination,
        pickupLocation,
        presentLocation,
        parcelStatus: "PLACED",
        parcelWeight,
        placeBy: user.userId,
        sentOn: new Date(),
        parcelWeightScale,
      });
      if (createdParcel) {
        return sendResponse(res, {
          statusCode: 201,
          success: true,
          message: "parcel has been created successfully",
          data: createdParcel,
        });
      }
    } catch (e) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: e.message,
      });
    }
  }

  static async getParcel(req, res, next) {
    const { parcelId } = req.params;
    try {
      const foundParcel = await parcel.findOne({
        where: {
          parcelId,
        },
      });
      if (foundParcel) {
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "parcel retrieved",
          data: foundParcel,
        });
      }
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "specific parcel does not exist",
        data: null,
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
    }
  }

  static async cancelParcel(req, res, next) {
    const { parcelId } = req.params;
    const { parcelStatus } = req.body;
    try {
      const foundParcel = await parcel.findAll({
        where: {
          parcelId,
        },
      });
      if (foundParcel.length > 0) {
        foundParcel.forEach(async (parcel) => {
          await parcel.update({
            parcelStatus,
          });
        });
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "parcel has been cancelled",
          data: foundParcel,
        });
      }
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "specific parcel does not exist",
        data: null,
      });
    } catch (e) {
      throw e;
    }
  }

  static async changeParcelStatus(req, res, next) {
    const { parcelId } = req.params;
    const { parcelStatus } = req.body;
    try {
      const foundParcel = await parcel.findAll({
        where: {
          parcelId,
        },
      });
      if (foundParcel.length > 0) {
        foundParcel.forEach(async (parcel) => {
          if (parcel.dataValues.parcelStatus === "CANCELLED") {
            return sendResponse(res, {
              statusCode: 404,
              success: false,
              message: "parcel has already been canceled",
            });
          }
          await parcel.update({
            parcelStatus,
          });

          return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "parcel status has been updated",
          });
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async changeDestination(req, res, next) {
    const { parcelId } = req.params;
    const { destination } = req.body;
    try {
      const foundParcel = await parcel.findAll({
        where: {
          parcelId,
        },
      });
      if (foundParcel.length > 0) {
        foundParcel.forEach(async (parcel) => {
          if (parcel.dataValues.parcelStatus === "DELIVERED") {
            return sendResponse(res, {
              statusCode: 404,
              success: false,
              message:
                "parcel has already been DELIVERED, so destination cant be changed",
            });
          }
          await parcel.update({
            destination,
          });
          return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "parcel destination has been updated",
            data: foundParcel,
          });
        });
      }
    } catch (e) {
      throw e;
    }
  }

  static async changePresentLocation(req, res, next) {
    const { parcelId } = req.params;
    const { presentLocation } = req.body;
    try {
      const foundParcel = await parcel.findAll({
        where: {
          parcelId,
        },
      });
      if (foundParcel.length > 0) {
        foundParcel.forEach(async (parcel) => {
          await parcel.update({
            presentLocation,
          });
        });
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "parcel presentLocation has been updated",
          data: foundParcel,
        });
      }
      return sendResponse(res, {
        statusCode: 404,
        success: false,
        message: "specific parcel does not exist",
        data: null,
      });
    } catch (e) {
      throw err;
    }
  }
}
