"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParcel = exports.validateSignin = exports.validateSignup = void 0;

var _expressValidator = require("express-validator");

const validateSignup = [(0, _expressValidator.check)('firstName').isLength({
  min: 1
}).trim().escape().withMessage('First Name field is required'), (0, _expressValidator.check)('lastName').isLength({
  min: 1
}).trim().escape().withMessage('Last Name field is required'), (0, _expressValidator.check)('email').isEmail().isLength({
  min: 1
}).trim().escape().withMessage('Email field is required'), (0, _expressValidator.check)('password').isLength({
  min: 8
}).trim().withMessage('Password must be more than 8 characters'), (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    });
  }

  return next();
}];
exports.validateSignup = validateSignup;
const validateSignin = [(0, _expressValidator.check)('email').isEmail().isLength({
  min: 1
}).trim().escape().withMessage('Email field is required'), (0, _expressValidator.check)('password').isLength({
  min: 8
}).trim().withMessage('Password must be more than 8 characters'), (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    });
  }

  return next();
}];
exports.validateSignin = validateSignin;
const validateParcel = [(0, _expressValidator.check)('parcelName').isLength({
  min: 2
}).trim().escape().withMessage('Parcel Name field is required'), (0, _expressValidator.check)('destination').isLength({
  min: 1
}).trim().escape().withMessage('Destination field is required'), (0, _expressValidator.check)('pickupLocation').isLength({
  min: 5
}).trim().escape().withMessage('Pickup location field is required'), (0, _expressValidator.check)('parcelWeight').isLength({
  min: 1
}).trim().escape().withMessage('Parcel weight field is required'), (0, _expressValidator.check)('placedBy').isLength({
  min: 1
}).trim().escape().withMessage('Placed by field is required'), (0, _expressValidator.check)('parcelWeightScale').isIn(['Kg', 'kg', 'g']).trim().escape().withMessage('In "Kg" or "g"'), (req, res, next) => {
  const errors = (0, _expressValidator.validationResult)(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()
    });
  }

  return next();
}];
exports.validateParcel = validateParcel;