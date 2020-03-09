"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendResponse = void 0;

const sendResponse = (res, options) => {
  let {
    statusCode,
    success,
    message,
    data
  } = options;
  statusCode = statusCode || 200;
  return res.status(statusCode).json({
    success: success || statusCode < 400,
    message,
    data
  });
};

exports.sendResponse = sendResponse;