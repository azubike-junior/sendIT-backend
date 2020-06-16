import jwt from "jsonwebtoken";
import { sendResponse } from "../helpers/response";
import dotenv from "dotenv";
dotenv.config();

const { DEV_DATABASE_SECRET } = process.env;

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const userToken = token
    if (!userToken || typeof userToken === "undefined") {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "No valid token provided"
      });
    }
    const decodedToken = jwt.verify(userToken, DEV_DATABASE_SECRET);
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

export default async (req, res, next) =>{
  try{
    const token = req.headers.authorization;
      const adminToken = token
      if (!adminToken || typeof adminToken === "undefined") {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "No valid token provided"
        });
      }
      const decodedToken = jwt.verify(adminToken, DEV_DATABASE_SECRET);
      if(decodedToken.sub.isAdmin === false){
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: 'Only Admin has Access',
        });
      }
      return next()
  }catch(e){
     return sendResponse(res, {
       statusCode: 401,
       success: false,
       message: e.message,
     });
  }
}

export const isNotAdmin = (req, res, next) =>{
  try{
    const token = req.headers.authorization;
      const adminToken = token
      if (!adminToken || typeof adminToken === "undefined") {
        return sendResponse(res, {
          statusCode: 401,
          success: false,
          message: "No valid token provided"
        });
      }
      const decodedToken = jwt.verify(adminToken, DEV_DATABASE_SECRET);
      if(decodedToken.sub.isAdmin === true){
        return sendResponse(res, {
          statusCode: 403,
          success: false,
          message: 'Admin has no access',
        });
      }
      return next()
  }catch(e){
     return sendResponse(res, {
       statusCode: 401,
       success: false,
       message: e.message,
     });
  }
}

