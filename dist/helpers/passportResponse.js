"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportResponse = void 0;

var _jwt = _interopRequireDefault(require("./jwt"));

const passportResponse = ({
  dataValues
}) => {
  const {
    id,
    email,
    displayName
  } = dataValues;
  return {
    id,
    email,
    displayName
  };
};

exports.passportResponse = passportResponse;