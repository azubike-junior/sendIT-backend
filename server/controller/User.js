import {
  generateToken,
  decodedJwt
} from "../helpers/jwt";
import crypto from 'crypto';
import {
  sendResponse,
  serverError,
  userResponse
} from "../helpers/response";
import models from "../models";
import {
  hashPassword,
  comparePassword
} from "../helpers/password";
import {
  getBaseUrl,
  sanitize,
  hostUrl
} from "../helpers/user";

const {
  users
} = models;
const imgRegex = /(http(s?):)([/|.|\w|\s|-])*/i

export class UserController {
  static async signupUser(req, res, next) {
    const {
      firstName,
      lastName,
      email,
      isAdmin
    } = req.body;
    try {
      const foundUser = await users.findAll({
        where: {
          email,
        },
      });
      if (foundUser.length > 0) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "Email has been used",
          data: null,
        });
      }
      const newUSer = await users.create({
        firstName,
        lastName,
        email,
        password: req.body.password,
        isAdmin,
      });
      const {
        password,
        ...user
      } = newUSer.dataValues;
      const token = generateToken(user.userId);
      const url = `${hostUrl}/user/verify/${token}`
      console.log('======', url)
      await newUSer.sendVerificationEmail(url)
      const message = `Sign up was successful. Please check your email to activate your account! If you don't find it in your inbox, please check your spam messages.`;
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message,
        data: token
      });
    } catch (e) {
      return serverError(res, e)
    }
  }

  static async signinUser(req, res) {
    const {
      email
    } = req.body;
    try {
      const user = await users.findOne({
        where: {
          email,
        },
      });
      if (user) {
        if (user.dataValues.isVerified === true) {
          const userPassword = user.get("password");
          const isMatch = await comparePassword(req.body.password, userPassword);
          if (!isMatch) {
            return sendResponse(res, {
              statusCode: 400,
              success: false,
              message: "invalid login credentials"
            });
          }
          const token = generateToken(user.userId);
          return sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "login success",
            data: token,
          });
        }
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "this account has not been verified"
        });
      }
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "invalid login credentials",
        data: null,
      });
    } catch (e) {
      return serverError(res, e)
    }
  }

  static async resetPassword(req, res) {
    const {
      body: {
        password
      }
    } = req;
    const {
      params: {
        token
      }
    } = req;
    try {
      const foundUser = await users.findOne({
        where: {
          resetToken: token
        }
      });
      if (foundUser) {
        await foundUser.resetPassword(password, token);
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "Your password has been changed successfully, you can now sign in",
          data: userResponse(foundUser)
        });
      }
      return sendResponse(res, {
        statusCode: 400,
        message: "Password Reset Failed, try again"
      });
    } catch (e) {
      console.log(e)
      return serverError(res, e)
    }
  }

  static async passwordResetRequest(req, res) {
    const {
      email
    } = req.body
    try {
      const buffer = crypto.randomBytes(32);
      const token = buffer.toString('hex')
      await users.update(
        {
          resetToken: token
        },
        {
        where: {
          email,
          isVerified: true
        }
      })
       const verifiedUser = await users.findOne({
         where: {
           email,
           isVerified:true
         }
       })
      if (verifiedUser) {
        const url = `${hostUrl}/user/reset_password`;
        console.log(url)
        await verifiedUser.sendPasswordResetEmail(url, token)
        console.log('=======token', verifiedUser, token)
        return sendResponse(res, {
          success: true,
          statusCode: 200,
          message: `Password Reset Email has been Sent Successfully to your email, `.concat(
            "check your Spam in case you did not find it in your inbox"
          ),
          data: token
        });
      }
      return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "invalid Email address or your account has not been verified"
      });
    } catch (e) {
      console.log(e)
      return serverError(res, e)
    }
  }

  static async verifyUserAccount(req, res) {
    const {
      params: {
        token
      }
    } = req;
    try {
      const decoded = decodedJwt(token);
      let user = await users.findByPk(decoded.userId);
      if (user) {
        console.log(user);
        if (user.get('isVerified') === true) {
          return sendResponse(res, {
            statusCode: 200,
            message: 'Account has been verified already'
          })
        }
        return sendResponse(res, {
          message: 'Account verification was successful',
          data: userResponse(await user.activateAccount())
        })
      }
      return sendResponse(res, {
        message: 'Sorry, user doesnot exist',
        statusCode: 404
      })
    } catch (e) {
      console.log(e)
      return serverError(res, e)
    }
  }

  static async signupAdmin(req, res) {
    try {
      const {
        firstName,
        lastName,
        email
      } = req.body;
      const foundUser = await users.findAll({
        where: {
          email
        }
      })
      if (foundUser.length > 0) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: 'email has been used'
        });
      }
      let newAdmin = await users.create({
        firstName,
        lastName,
        email,
        password: req.body.password,
        isAdmin: true
      })
      const {
        password,
        ...user
      } = newAdmin.dataValues;
      const token = generateToken(user)
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'registered success',
        data: token
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message
      })
    }
  }

  static async getUsers(req, res) {
    try {
      const foundUsers = await users.findAll();
      const allUsers = foundUsers.map(user => {
        user.password = undefined
        return user;
      })
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        message: foundUsers
      })
    } catch (e) {
      return serverError(res, e)
    }
  }

  static async getOneUser(req, res) {
    try {
      const {
        userId
      } = req.user
      const foundUser = await users.findOne({
        where: {
          userId: userId
        }
      })
      if (!foundUser) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'user Not found'
        })
      }
      foundUser.dataValues.password = undefined
      return sendResponse(res, {
        statusCode: 200,
        success: true,
        data: foundUser
      })
    } catch (e) {
      return serverError(res, e)
    }
  }

  static async updateProfileImage(req, res) {
    try {
      const {
        body: {
          imageUrl
        },
        user: {
          userId
        }
      } = req

      const foundUser = await users.findOne({
        where: {
          userId: userId
        }
      })
      if (!foundUser) {
        return sendResponse(res, {
          statusCode: 404,
          success: false,
          message: 'user Not found'
        })
      }
      if (!imgRegex.test(imageUrl)) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: 'image has to be png/jpeg'
        })
      }
      foundUser.updateImage(imageUrl)
      foundUser.dataValues.password = undefined
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        data: foundUser
      })
    } catch (e) {
      return serverError(res, e)
    }
  }

  static socialAuth(req, res) {
    return sendResponse(res, {
      statusCode: 200,
      data: req.user
    });
  };

}