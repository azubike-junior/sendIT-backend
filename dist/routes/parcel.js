"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _validate = require("../helpers/validate");

var _verifyToken = require("../middlewares/verifyToken");

var _parcel = _interopRequireDefault(require("../controller/parcel"));

const router = _express.default.Router();

router.get('/parcels', _parcel.default.getParcels);
router.get('/parcels/:id', _parcel.default.getParcel);
router.post('/parcels', _validate.validateParcel, _parcel.default.createParcel);
router.put('/parcels/:id/cancel', _verifyToken.verifyToken, _parcel.default.cancelParcel);
router.put('/parcels/:id/destination', _verifyToken.verifyToken, _parcel.default.changeDestination);
router.put('/parcels/:id/presentLocation', _verifyToken.verifyToken, _parcel.default.changePresentLocation);
router.put('/parcels/:id/status', _verifyToken.verifyToken, _parcel.default.changeParcelStatus);
var _default = router;
exports.default = _default;