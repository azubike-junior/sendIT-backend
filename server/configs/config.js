import dotenv from 'dotenv'
dotenv.config()

const {
    DEV_DATABASE_URL,
    DEV_DATABASE_DIALECT,
    DATABASE_URL,
    PROD_DATABASE_DIALECT,
    DEV_DATABASE_SECRET,
} = process.env

export const dbConfig = {
    development: {
        url: DEV_DATABASE_URL,
        dialect: DEV_DATABASE_DIALECT
    },
    production: {
        url: DATABASE_URL,
        dialect: PROD_DATABASE_DIALECT
    }
}

export const jwtConfig = {
    secret: DEV_DATABASE_SECRET
}