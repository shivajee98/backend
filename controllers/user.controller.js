// controllers/user.controller.js
import jwt from "jsonwebtoken";
import { User } from "../models/users.model.js";
import {ApiError} from "../utils/ApiError.js"

const generateTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Optionally save the refresh token in the database if ne  eded
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating Tokens");
  }
};

export const handleAuthCallback = async (req, res, next) => {
  try {
    const user = req.user;
    const tokens = await generateTokens(user._id); // Ensure to await the promise

    // Send tokens to the client
    res.json({
      success: true,
      tokens,
    });
  } catch (error) {
    next(error);
  }
};

export { generateTokens }
