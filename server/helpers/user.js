const dotenv = require('dotenv').config()

const {
    local,
    emailBaseUrl
} = process.env

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../configs/config.js')[env];
console.log(config.host)

export const hostUrl = config.host === 'localhost' ? local : local

export const getBaseUrl = httpRequest => {
    return `${httpRequest.protocol}://${httpRequest.get('host')}`
}