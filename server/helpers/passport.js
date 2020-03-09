import models from '../models'
const {
    users
} = models
import {
    passportResponse
} from './passportResponse'

export const getAccessFromFacebookApi = (access, Token, profile, done) => {
    process.nextTick(async () => {
        try {
            const foundUser = await users.findOne({
                where: {
                    email: profile.emails[0].value
                }
            })
            if (!foundUser) {
                const displayName = profile.displayName.split(" ")
                const newUser = await users.create({
                    firstName: displayName[0],
                    lastName: displayName[1],
                    email: profile.emails[0].value,
                    password: "",
                    isAdmin: false

                })
                console.log('newUser:', newUser)
                return done(null, passportResponse(newUser))
            }
            return done(null, passportResponse(foundUser))
        } catch (e) {
            throw e
        }
    })
}

export const getAccessFromGoogleApi = (access, Token, profile, done) => {
    process.nextTick(async () => {
        try {
            const foundUser = await users.findOne({
                where: {
                    email: profile.emails[0].value
                }
            })
            console.log('foundUser:', foundUser)
            if (!foundUser) {
                const displayName = profile.displayName.split(" ")
                const newUser = await users.create({
                    firstName: displayName[0],
                    lastName: displayName[1],
                    email: profile.emails[0].value,
                    password: "",
                    isAdmin: false

                })
                console.log('newUser:', newUser)
                return done(null, passportResponse(newUser))
            }
            return done(null, passportResponse(foundUser))
        } catch (e) {
            throw e
        }
    })
}