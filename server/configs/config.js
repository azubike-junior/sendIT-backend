import dotenv from 'dotenv'
dotenv.config()

const {
    DEV_DATABASE_URL,
    DEV_DATABASE_DIALECT,
    PROD_DATABASE_URL,
    PROD_DATABASE_DIALECT,
    DEV_DATABASE_SECRET
} = process.env

export const dbConfig = {
    development: {
        connectionString: DEV_DATABASE_URL,
        dialect: DEV_DATABASE_DIALECT
    },
    production: {
        connectionString: PROD_DATABASE_URL,
        dialect: PROD_DATABASE_DIALECT
    }
}

export const jwtConfig = {
    secret: DEV_DATABASE_SECRET
}