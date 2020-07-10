const dotenv = require('dotenv').config()

const {
  DEV_DATABASE_URL,
  EXPIRY_TIME,
  DATABASE_URL,
  isProd,
  NODE_ENV,
  emailBaseUrl,
  local
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

// export const hostUrl = isProd === 'production' ? 'https://seansendit.netlify.app' : 'http://localhost:3000'

export const ISPROD = isProd;

export const expiryTime = EXPIRY_TIME