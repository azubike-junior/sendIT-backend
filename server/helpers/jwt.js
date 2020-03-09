import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import {
    jwtConfigs
} from '../configs/config'

dotenv.config();

const {
    DEV_DATABASE_SECRET
} = process.env

export const generateToken = (user) => {
    return jwt.sign({
        sub: user
    }, DEV_DATABASE_SECRET)
}