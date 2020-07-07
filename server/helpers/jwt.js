import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { DEV_DATABASE_SECRET } = process.env;

export const generateToken = (userId) => {
  return jwt.sign(
    {
      userId
    },
    DEV_DATABASE_SECRET
  );
};

export const decodedJwt = (token) => {
  return jwt.verify(token, DEV_DATABASE_SECRET);
}