"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _parcel = _interopRequireDefault(require("./parcel"));

var _users = _interopRequireDefault(require("./users"));

const router = _express.default.Router();

router.use('/user', _users.default);
router.use('/parcel', _parcel.default);
var _default = router;
exports.default = _default;