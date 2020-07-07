import {
    ISPROD
} from "../configs/config";
import {generateToken} from '../helpers/jwt'

export const sendResponse = (res, options) => {
    let {
        statusCode,
        success,
        message,
        data
    } = options

    statusCode = statusCode || 200;
    return res.status(statusCode).json({
        message,
        success,
        data
    });
}

export const userResponse = (datavalues) => {
    const {
        userId,
        email
    } = datavalues
    return {
        userId,
        email,
        token: generateToken(datavalues.userId)
    }
}

export const serverError = (res, error) => {
    return res.status(error.status || 500).json({
        success: false,
        message: ISPROD ? 'Sorry, internal error occured, try again later!' : error.message
    })
}