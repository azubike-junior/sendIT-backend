const dotenv = require('dotenv').config()

const {
    isProd,
    NODE_ENV,
    emailBaseUrl,
    local
} = process.env

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/config.js')[env];
console.log(config)

export const hostUrl = config.use_env_variable ? local : emailBaseUrl

export const getBaseUrl = httpRequest => {
    return `${httpRequest.protocol}://${httpRequest.get('host')}`
}