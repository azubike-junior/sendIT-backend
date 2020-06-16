import express from "express";
const router = express.Router();
import passport from "passport";
import {
  UserController
} from "../controller/User";
import isAdmin, {
  verifyToken
} from "../middlewares/verifyToken";
import {
  validateSignup,
  validateSignin
} from "../helpers/validate";

router.post("/signup", validateSignup, UserController.signupUser);

router.post("/signin", validateSignin, UserController.signinUser);

router.get('/users', isAdmin, verifyToken, UserController.getUsers)

router.get('/user', verifyToken, UserController.getOneUser)

router.put('/user', verifyToken, UserController.updateProfileImage)

router.post('/signup/admin', validateSignup, UserController.signupAdmin)

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
  })
);

export default router;