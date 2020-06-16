import {
  generateToken
} from "../helpers/jwt";
import {
  sendResponse
} from "../helpers/response";
import models from "../models";
import {
  hashPassword,
  comparePassword
} from "../helpers/encrypt";
const {
  parcel,
  users
} = models;
const imageRegex = /(https?:\/\/.*\.(?:png|jpg))/i
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
        password: hashPassword(req.body.password),
        isAdmin,
      });
      const {
        password,
        ...user
      } = newUSer.dataValues;
      const token = generateToken(user);
      return sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "user registered successfully",
        data: token,
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message
      })
    }
  }

  static async signinUser(req, res) {
    const {
      email
    } = req.body;
    try {
      const foundUser = await users.findOne({
        where: {
          email,
        },
      });
      if (!foundUser) {
        return sendResponse(res, {
          statusCode: 400,
          success: false,
          message: "invalid login credentials",
          data: null,
        });
      }
      const dbPassword = foundUser.get("password");
      const isMatch = await comparePassword(req.body.password, dbPassword);
      const {
        password,
        ...user
      } = foundUser.dataValues
      const token = generateToken(user);
      if (isMatch) {
        return sendResponse(res, {
          statusCode: 200,
          success: true,
          message: "login successfully",
          data: token
        });
      }
      return sendResponse(res, {
        statusCode: 400,
        success: false,
        message: "invalid login credentials",
        data: null,
      });
    } catch (e) {
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message
      })

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
        password: hashPassword(req.body.password),
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
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message
      })
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
      return sendResponse(res, {
        statusCode: 500,
        success: false,
        message: e.message
      })
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
       return sendResponse(res, {
         statusCode: 500,
         success: false,
         message: e.message
       })
    }
  }

}