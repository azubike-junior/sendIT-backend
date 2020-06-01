"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _User = require("../controller/User");

var _validate = require("../helpers/validate");

const router = _express.default.Router();

router.post('/signup', _validate.validateSignup, _User.userController.signupUser);
router.post('/signin', _validate.validateSignin, _User.userController.signinUser);
router.get('/parcels', _User.userController.getParcels);
router.get('/google', _passport.default.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/auth/google/callback', _passport.default.authenticate('google', {
  session: false
}), _User.userController.Auth);
router.get('/facebook', _passport.default.authenticate('facebook', {
  scope: ['profile', 'email']
}));
router.get('/auth/facebook/callback', _passport.default.authenticate('facebook', {
  session: false
}), _User.userController.Auth);
var _default = router;
exports.default = _default;