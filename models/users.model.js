// backend models/user.model.js
import mongoose, { Schema } from "mongoose";
import jwt  from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      default: "",
      unique: true,
      lowercase: true,
      trim: true,
      index: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true
    },
    avatar: {
      type: String, // Cloudinary URL
      required: true
    },
    coverImage: {
      type: String,
      default: ""
    },
    googleId: {
      type: String, // Store Google user ID
      unique: true,
      sparse: true // Allows for null values
    },
    refreshToken: {
      type: String // Store the refresh token from Google
    },
    website: {
      type: String,
      default: "",
      unique: true,
    },
    twitter: {
      type: String,
      default: "",
      unique: true,
    },
    github: {
      type: String,
      default: "",
      unique: true,
    },
    linkedin: {
      type: String,
      default: "",
      unique: true,
    }
  },
  { timestamps: true }
);



userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this._id,
    email: this.email,
    username: this.username,
    googleId: this.googleId,
    },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
      }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({
    _id: this._id
  },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY
  }
  )
}

export const User = mongoose.model("User", userSchema);
