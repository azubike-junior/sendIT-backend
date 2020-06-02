import jwt from "jsonwebtoken";
import { sendResponse } from "../helpers/response";
import dotenv from "dotenv";

dotenv.config();

const { DEV_DATABASE_SECRET } = process.env;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userToken = token.split(" ")[1];
    if (!userToken || typeof userToken === "undefined") {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "No valid token provided",
        data: null,
      });
    }
    const decodedToken = await jwt.verify(userToken, DEV_DATABASE_SECRET);

    req.user = decodedToken.sub;
    return next();
  } catch (e) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: e.message,
    });
  }
};
