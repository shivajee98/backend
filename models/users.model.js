// backend/models/user.model.js
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        username: {
            type: String,
            default: "",
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, // Cloudinary URL
            sparse: true,
            required: true,
        },
        coverImage: {
            type: String,
            sparse: true,
        },
        googleId: {
            type: String, // Store Google user ID
            unique: true,
            sparse: true, // Allows for null values
        },
        refreshToken: {
            type: String, // Store the refresh token from Google
        },
        website: {
            type: String,
            unique: true,
            sparse: true
            // default: null, // Allow null value
        },
        twitter: {
            type: String,
            sparse: true,
            unique: true,
            // default: null, // Allow null value
        },
        github: {
            type: String,
            sparse: true,
            unique: true,
            // default: null, // Allow null value
        },
        linkedin: {
            type: String,
            sparse: true,
            unique: true,
            // default: null, // Allow null value
        },
        articles: [
            {
                type: Schema.ObjectId,
                ref: "Article", // Reference to the Article model
            },
        ],
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
        });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        });
};

export const User = mongoose.model("User", userSchema);
