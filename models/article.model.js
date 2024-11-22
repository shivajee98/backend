// src/models/article.model.js
import mongoose, { Schema } from "mongoose";
import { Comment } from "./comment.models.js";

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
        },
        comments: [Comment.schema],
        likes: {
            type: Number,
            default: 0
        }
    },
    { timestamps: true }
);

export const Article = mongoose.model("Article", articleSchema);
