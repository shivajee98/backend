// src/models/article.model.js
import mongoose, { Schema } from "mongoose";

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        paragraph: {
            type: String,
            required: true
        },
        author: {
            type: Schema.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        }
    },
    { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);
