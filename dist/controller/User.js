"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userController = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jwt = require("../helpers/jwt");

var _response = require("../helpers/response");

var _models = _interopRequireDefault(require("../models"));

var _encrypt = require("../helpers/encrypt");

const {
  parcels,
  users
} = _models.default;

class userController {
  static async signupUser(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      isAdmin
    } = req.body;

    try {
      const foundUser = await users.findAll({
        where: {
          email
        }
      });
      console.log(foundUser);

      if (foundUser.length > 0) {
        return (0, _response.sendResponse)(res, {
          statusCode: 400,
          success: false,
          message: 'Email has been used',
          data: null
        });
      }

      const newUSer = await users.create({
        firstName,
        lastName,
        email,
        password: (0, _encrypt.hashPassword)(req.body.password),
        isAdmin
      });
      const _newUSer$dataValues = newUSer.dataValues,
            {
        password
      } = _newUSer$dataValues,
            user = (0, _objectWithoutProperties2.default)(_newUSer$dataValues, ["password"]);
      const token = (0, _jwt.generateToken)(user);
      return (0, _response.sendResponse)(res, {
        statusCode: 200,
        success: true,
        message: 'user registered successfully',
        data: token
      });
    } catch (e) {
      throw e;
    }
  }

  static async signinUser(req, res) {
    const {
      email,
      password
    } = req.body;
    console.log(req.body);

    try {
      const foundUser = await users.findOne({
        where: {
          email
        }
      });
      console.log('founduser', foundUser);

      if (!foundUser) {
        return (0, _response.sendResponse)(res, {
          statusCode: 400,
          success: false,
          message: 'invalid login credentials',
          data: null
        });
      }

      const user = foundUser.get('password');
      console.log(user);
      const isMatch = await (0, _encrypt.comparePassword)(password, user);

      if (isMatch) {
        const token = await (0, _jwt.generateToken)(user);
        return (0, _response.sendResponse)(res, {
          statusCode: 201,
          success: true,
          message: 'login successfully',
          data: token
        });
      }

      return (0, _response.sendResponse)(res, {
        statusCode: 400,
        success: false,
        message: 'invalid login credentials',
        data: null
      });
    } catch (e) {
      throw e;
    }
  }

  static async getParcels(req, res, next) {
    const foundParcels = await parcels.findAll();

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
  }

  static async Auth(req, res) {
    return (0, _response.sendResponse)(res, {
      message: 'google login passed'
    });
  }

}

exports.userController = userController;