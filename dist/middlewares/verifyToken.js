"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _response = require("../helpers/response");

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

const {
  DEV_DATABASE_SECRET
} = process.env;

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return (0, _response.sendResponse)(res, {
      statusCode: 401,
      success: false,
      message: 'No valid token provided',
      data: null
    });
  }

  try {
    const decodedToken = await _jsonwebtoken.default.verify(token, DEV_DATABASE_SECRET);
    req.user = decodedToken;
    return next();
  } catch (e) {
    throw e;
  }
};

exports.verifyToken = verifyToken;