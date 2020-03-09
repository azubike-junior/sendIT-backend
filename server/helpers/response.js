export const sendResponse = (res, options) => {
    let {
        statusCode,
        success,
        message,
        data
    } = options

    statusCode = statusCode || 200;
    return res.status(statusCode).json({
        success: success || statusCode < 400,
        message,
        data
    })
}