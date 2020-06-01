"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _config = require("../configs/config");

_dotenv.default.config();

const {
  DEV_DATABASE_SECRET
} = process.env;

const generateToken = user => {
  return _jsonwebtoken.default.sign({
    sub: user
  }, DEV_DATABASE_SECRET);
};

exports.generateToken = generateToken;