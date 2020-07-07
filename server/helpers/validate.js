import { check, validationResult } from "express-validator";
import Joi from 'joi';

export const validateParcel = [
  check("parcelName")
    .isLength({
      min: 2,
    })
    .trim()
    .escape()
    .withMessage("Parcel Name field is required"),
  check("destination")
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("Destination field is required"),
  check("pickupLocation")
    .isLength({
      min: 5,
    })
    .trim()
    .escape()
    .withMessage("Pickup location field is required"),
  check("parcelWeight")
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("Parcel weight field is required"),
  check("parcelWeightScale")
    .isIn(["Kg", "kg", "g"])
    .trim()
    .escape()
    .withMessage('In "Kg" or "g"'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    return next();
  },
];

export const passwordResetValidation = [
  check("password")
    .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-.]).{6,}$/)
    .isLength({
      min: 2,
    })
    .trim()
    .escape()
    .withMessage("Password must be atleast 6 chars with atleast 1 uppercase, 1 number, & 1 special char"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array(),
      });
    }
    return next();
  },
]