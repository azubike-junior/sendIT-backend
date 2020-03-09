"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAccessFromGoogleApi = exports.getAccessFromFacebookApi = void 0;

var _models = _interopRequireDefault(require("../models"));

var _passportResponse = require("./passportResponse");

const {
  users
} = _models.default;

const getAccessFromFacebookApi = (access, Token, profile, done) => {
  process.nextTick(async () => {
    try {
      const foundUser = await users.findOne({
        where: {
          email: profile.emails[0].value
        }
      });

      if (!foundUser) {
        const displayName = profile.displayName.split(" ");
        const newUser = await users.create({
          firstName: displayName[0],
          lastName: displayName[1],
          email: profile.emails[0].value,
          password: "",
          isAdmin: false
        });
        console.log('newUser:', newUser);
        return done(null, (0, _passportResponse.passportResponse)(newUser));
      }

      return done(null, (0, _passportResponse.passportResponse)(foundUser));
    } catch (e) {
      throw e;
    }
  });
};

exports.getAccessFromFacebookApi = getAccessFromFacebookApi;

const getAccessFromGoogleApi = (access, Token, profile, done) => {
  process.nextTick(async () => {
    try {
      const foundUser = await users.findOne({
        where: {
          email: profile.emails[0].value
        }
      });
      console.log('foundUser:', foundUser);

      if (!foundUser) {
        const displayName = profile.displayName.split(" ");
        const newUser = await users.create({
          firstName: displayName[0],
          lastName: displayName[1],
          email: profile.emails[0].value,
          password: "",
          isAdmin: false
        });
        console.log('newUser:', newUser);
        return done(null, (0, _passportResponse.passportResponse)(newUser));
      }

      return done(null, (0, _passportResponse.passportResponse)(foundUser));
    } catch (e) {
      throw e;
    }
  });
};

exports.getAccessFromGoogleApi = getAccessFromGoogleApi;