import express from 'express';
const router = express.Router()
import passport from 'passport'
import {
    userController
} from '../controller/AuthController'
import {
    validateSignup,
    validateSignin
} from '../helpers/validate'

router.post('/signup', validateSignup, userController.signupUser)

router.post('/signin', validateSignin, userController.signinUser)

router.get('/parcels', userController.getParcels)

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google', {
    session: false
}), userController.Auth);

router.get('/facebook', passport.authenticate('facebook', {
    scope: ['profile', 'email']
}));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    session: false
}), userController.Auth);

export default router;