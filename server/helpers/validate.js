import { check, validationResult } from "express-validator";

export const validateSignup = [
  check("firstName")
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("First Name field is required"),
  check("lastName")
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("Last Name field is required"),
  check("email")
    .isEmail()
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("Email field is required"),
  check("password")
    .isLength({
      min: 8,
    })
    .trim()
    .withMessage("Password must be more than 8 characters"),
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

export const validateSignin = [
  check("email")
    .isEmail()
    .isLength({
      min: 1,
    })
    .trim()
    .escape()
    .withMessage("Email field is required"),
  check("password")
    .isLength({
      min: 8,
    })
    .trim()
    .withMessage("Password must be more than 8 characters"),
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

export const updateImageValidation = () => {

}
