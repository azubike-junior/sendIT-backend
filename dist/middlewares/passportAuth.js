"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.passportGoogleConfiguration = exports.passportfacebookConfiguration = void 0;

var _passportFacebook = require("passport-facebook");

var _passportGoogleOauth = require("passport-google-oauth2");

var _passport = require("../helpers/passport");

var _apiConfig = require("../configs/apiConfig");

const passportfacebookConfiguration = passport => {
  passport.use(new _passportFacebook.Strategy(_apiConfig.passportFacebookConfig, _passport.getAccessFromFacebookApi));
};

exports.passportfacebookConfiguration = passportfacebookConfiguration;

const passportGoogleConfiguration = passport => {
  passport.use(new _passportGoogleOauth.Strategy(_apiConfig.passportGoogleConfig, _passport.getAccessFromGoogleApi));
};

exports.passportGoogleConfiguration = passportGoogleConfiguration;