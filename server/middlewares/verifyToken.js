import jwt from 'jsonwebtoken'
import {
    sendResponse
} from '../helpers/response'
import dotenv from 'dotenv'

dotenv.config()

const {
    DEV_DATABASE_SECRET
} = process.env


export const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return sendResponse(res, {
            statusCode: 401,
            success: false,
            message: 'No valid token provided',
            data: null
        })
    }
    try {
        const decodedToken = await jwt.verify(token, DEV_DATABASE_SECRET)
        req.user = decodedToken;
        return next();
    } catch (e) {
        throw e
    }
}