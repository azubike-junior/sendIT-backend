const dotenv = require('dotenv').config()

const {
  DEV_DATABASE_URL,
  EXPIRY_TIME,
  DATABASE_URL,
  isProd
} = process.env

module.exports = {
  development: {
    url: DEV_DATABASE_URL
  },
  production: {
    url: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
      connectTimeout: 60000
    }
  }
}

module.exports.ISPROD = isProd
module.exports.expiryTime = EXPIRY_TIME