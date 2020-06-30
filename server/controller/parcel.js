import models from "../models";
import {
  sendResponse
} from "../helpers/response";
const {
  parcel
} = models;
import ParcelServices from '../services/parcelServices'
import {getPage, paginate, paginatePage} from '../helpers/pagination'

export default class ParcelController {
  static async getParcels(req, res, next) {
    try {
      // const foundParcels = await parcel.findAll();
      const {
        page,
        limit
      } = getPage(req.query)
      const foundParcels = await ParcelServices.getParcels(
        paginate({numberOfPage, pageLimit}))
      const result = {
        count: foundParcels.count(),
        foundParcels
      }
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
        data: result
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
    }
  }

  static async getUserParcel(req, res) {
    try {
      const { user: { userId } } = req;
      const { numberOfPage, pageLimit } = getPage(req.query)
      const userParcels = await ParcelServices.getUserParcels(userId, paginate({numberOfPage, pageLimit}))
      // const userParcels = await parcel.findAll({
      //   where: {
      //     placeBy: userId.toString()
      //   },
      //   paginate({page, limit})
      // })
      const results = {
        allParcels: userParcels.length,
        userParcels
      }
      if (!userParcels.length) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message:'No parcel found'
        })
      }
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message:'parcels retrieved by User',
        data: results
      })
    } catch (e){
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
          parcelWeight,
          parcelWeightScale,
        },
        user
      } = req;

      let createdParcel = await parcel.create({
        parcelName,
        destination,
        pickupLocation,
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
    const {
      parcelId
    } = req.params;
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
    const {
      parcelId
    } = req.params;
    try {
      const foundParcel = await parcel.findOne({
        where: {
          parcelId,
        },
      });
      if (!foundParcel) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'No parcel found',
        });
      }
      if (foundParcel.parcelStatus === 'CANCELLED') {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: 'Order has been cancelled already',
        });
      }
      foundParcel.updateOrder('CANCELLED');
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Order Cancelled',
      })
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
    }

  }

  static async changeParcelStatus(req, res, next) {
    const {
      parcelId
    } = req.params;
    let {
      parcelStatus
    } = req.body;
    try {
      const foundParcel = await parcel.findOne({
        where: {
          parcelId,
        },
      });

      let checkedStatus = parcelStatus.toUpperCase()
      if (checkedStatus === 'DELIVERED') {
        parcelStatus = 'DELIVERED'
      }
      if (checkedStatus === 'TRANSITING') {
        parcelStatus = 'TRANSITING'
      }
      if (!foundParcel) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'no parcel found',
        })
      }
      await foundParcel.updateOrder(parcelStatus)
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'parcel updated',
      })
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
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
      const foundParcel = await parcel.findAll({
        where: {
          parcelId,
        },
      });
      if (foundParcel.length > 0) {
        foundParcel.forEach(async (parcel) => {
          if (parcel.dataValues.parcelStatus === "DELIVERED") {
            return sendResponse(res, {
              statusCode: 400,
              success: false,
              message: "parcel has already been DELIVERED, so destination cant be changed",
            });
          }
          await parcel.update({
            destination,
          });
          return sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "parcel destination has been updated",
            data: foundParcel,
          });
        });
      }
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
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
          statusCode: 201,
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
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message,
      });
    }
  }
}