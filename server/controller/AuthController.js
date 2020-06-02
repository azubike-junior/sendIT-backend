import {
    generateToken
} from '../helpers/jwt';
import {
    sendResponse
} from '../helpers/response';
import models from '../models'
import {
    hashPassword,
    comparePassword
} from '../helpers/encrypt'
const {
    parcels,
    users
} = models

export class userController {
    static async signupUser(req, res, next) {
        const {
            firstName,
            lastName,
            email,
            isAdmin
        } = req.body
        try {
            const foundUser = await users.findAll({
                where: {
                    email
                }
            })
            if (foundUser.length > 0) {
                return sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Email has been used',
                    data: null
                })
            }
            const newUSer = await users.create({
                firstName,
                lastName,
                email,
                password: hashPassword(req.body.password),
                isAdmin: false
            })
            const {
                password,
                ...user
            } = newUSer.dataValues;

            const token = generateToken(user);
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'user registered successfully',
                data: token
            })
        } catch (e) {
            throw e;
        }
    }

    static async signinUser(req, res) {
        const {
            email,
            password
        } = req.body;
        console.log(req.body)
        try {
            const foundUser = await users.findOne({
                where: {
                    email
                }
            })
            console.log('founduser', foundUser)
            if (!foundUser) {
                return sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'invalid login credentials',
                    data: null
                })
            }
            const user = foundUser.get('password')
            console.log(user)
            const isMatch = await comparePassword(password, user)
            if (isMatch) {
                const token = await generateToken(user)
                return sendResponse(res, {
                    statusCode: 201,
                    success: true,
                    message: 'login successfully',
                    data: token
                })
            }
            return sendResponse(res, {
                statusCode: 400,
                success: false,
                message: 'invalid login credentials',
                data: null
            })
        } catch (e) {
            throw e
        }
    }

    static async getParcels(req, res, next) {
        const foundParcels = await parcels.findAll();
        if (!foundParcels) {
            return sendResponse(res, {
                statusCode: 404,
                success: false,
                message: 'No parcel found',
                data: null
            });
        }
        return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'all parcels retrieved',
            data: foundParcels
        });
    }

    static async Auth(req, res) {
        return sendResponse(res, {
            message: 'google login passed'
        });
    }

    static async signUpUserByAdmin(req, res, next) {
        const {
            firstName,
            lastName,
            email,
            isAdmin
        } = req.body
        try {
            const foundUser = await users.findAll({
                where: {
                    email
                }
            })
            if (foundUser.length > 0) {
                return sendResponse(res, {
                    statusCode: 400,
                    success: false,
                    message: 'Email has been used',
                    data: null
                })
            }
            const newUSer = await users.create({
                firstName,
                lastName,
                email,
                password: hashPassword(req.body.password),
                isAdmin
            })
            const {
                password,
                ...user
            } = newUSer.dataValues;

            const token = generateToken(user);
            return sendResponse(res, {
                statusCode: 200,
                success: true,
                message: 'user registered successfully',
                data: token
            })
        } catch (e) {
            throw e;
        }
    }
}