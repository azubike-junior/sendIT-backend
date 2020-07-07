import {
  sendEmail
} from '../email/email'
import bcrypt from 'bcryptjs';
import {
  expiryTime
} from '../configs/config';
import {
  hashPassword
} from '../helpers/password';
import {
  resetConstants
} from '../email/constants/passwordResetConstants'
import {
  verifyConstants
} from '../email/constants/verificationConstants'
import {
  encryptToken,
  decryptToken,
  getTimeDifference
} from '../helpers/crypto'


"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "users", {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: DataTypes.TEXT,
      lastName: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      resetToken: DataTypes.STRING,
      imageUrl: {
        type: DataTypes.STRING,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    }, {
      freezeTableName: true,
      timestamps: false,

      hooks: {
        beforeCreate: (user) => {
          user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
          return user.password
        }
      }
    }
  );

  user.associate = function (models) {
    user.hasMany(models.parcel, {
      foreignKey: "placeBy",
      target: "userId",
      onDelete: "CASCADE",
    });
  }
  user.prototype.generateResetToken = async function () {
    this.resetToken = encryptToken();
    this.save();
    await this.reload();
    return this.resetToken;
  }
  user.prototype.sendVerificationEmail = async function (url) {
    const {
      firstName,
      lastName,
      email
    } = this;
    await sendEmail(firstName, lastName, email, 'EMAIL VERIFICATION', url, verifyConstants)
  }
  user.prototype.sendPasswordResetEmail = async function (url) {
    const {
      firstName,
      lastName,
      email
    } = this;
    const resetToken = await this.generateResetToken();
    const resetUrl = `${url}/${resetToken}`;
    await sendEmail(firstName, lastName, email, 'RESET EMAIL', resetUrl, resetConstants)
  }
  user.prototype.resetPassword = async function (password, token) {
    if (getTimeDifference(decryptToken(token)) > Number(expiryTime)) {
      throw new Error('The Link has expired')
    }
    this.password = hashPassword(password);
    this.resetToken = '';
    this.save();
    await this.reload()
  }
  user.prototype.updateImage = async function (newImage) {
    this.imageUrl = newImage
    await this.save()
    return this
  }
    user.prototype.updateProfile = async function (user) {
      const {
        firstName,
        lastName,
      } = user;
      this.firstName = firstName || this.firstName,
        this.lastName = lastName || this.lastName
      this.save()
      await this.reload();
      return this;
    }
  user.prototype.activateAccount = async function () {
    this.isVerified = true;
    this.save();
    await this.reload();
    return this;
  }

  return user;
};