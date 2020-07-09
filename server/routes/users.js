import {
  Router
} from "express";
const userRouter = Router();
import passport from "passport";
import {
  UserController
} from "../controller/User";
import {
  verifyToken
} from "../middlewares/verifyToken";
import {
  validateInput
} from '../middlewares/validateInput'
import {
  passwordResetValidation
} from '../helpers/validate'

userRouter.post("/signup", validateInput, UserController.signupUser);

userRouter.post("/signin", validateInput, UserController.signinUser);

userRouter.get('/verify/:token', UserController.verifyUserAccount)

userRouter.post('/resetPassword', UserController.passwordResetRequest)

userRouter.put('/resetPassword/:token', passwordResetValidation, UserController.resetPassword)

userRouter.get('/', verifyToken, UserController.getOneUser)

userRouter.put('/', verifyToken, UserController.updateProfileImage)

userRouter.post('/signup/admin', validateInput, UserController.signupAdmin)

userRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

userRouter.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: false,
  }), UserController.socialAuth
);

userRouter.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["profile", "email"],
  })
);

userRouter.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    session: false,
  }), UserController.socialAuth
);

export default userRouter;