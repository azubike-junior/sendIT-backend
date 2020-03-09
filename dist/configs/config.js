"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jwtConfig = exports.dbConfig = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv.default.config();

const {
  DEV_DATABASE_URL,
  DEV_DATABASE_DIALECT,
  DATABASE_URL,
  PROD_DATABASE_DIALECT,
  DEV_DATABASE_SECRET
} = process.env;
const dbConfig = {
  development: {
    connectionString: DEV_DATABASE_URL,
    dialect: DEV_DATABASE_DIALECT
  },
  production: {
    connectionString: DATABASE_URL,
    dialect: PROD_DATABASE_DIALECT
  }
};
exports.dbConfig = dbConfig;
const jwtConfig = {
  secret: DEV_DATABASE_SECRET
};
exports.jwtConfig = jwtConfig;