"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comparePassword = exports.hashPassword = void 0;

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

const hashPassword = password => {
  const rounds = _bcryptjs.default.genSaltSync(10);

  return _bcryptjs.default.hashSync(password, rounds);
};

exports.hashPassword = hashPassword;

const comparePassword = async (password, hash) => {
  const equals = _bcryptjs.default.compare(password, hash);

  return Promise.resolve(equals);
};

exports.comparePassword = comparePassword;