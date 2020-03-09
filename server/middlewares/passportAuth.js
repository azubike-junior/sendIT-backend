import {
    Strategy as facebookStrategy
} from 'passport-facebook'
import {
    Strategy as GoogleStrategy
} from 'passport-google-oauth2'
import {
    getAccessFromFacebookApi,
    getAccessFromGoogleApi
} from '../helpers/passport'
import {
    passportFacebookConfig,
    passportGoogleConfig
} from '../configs/apiConfig'

const passportfacebookConfiguration = passport => {
    passport.use(new facebookStrategy(passportFacebookConfig, getAccessFromFacebookApi))
}

const passportGoogleConfiguration = passport => {
    passport.use(new GoogleStrategy(passportGoogleConfig, getAccessFromGoogleApi))
}

export {
    passportfacebookConfiguration,
    passportGoogleConfiguration
}