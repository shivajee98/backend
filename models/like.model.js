// backend/models/like.model.js
import mongoose, { Schema } from "mongoose";

const likeSchema = new Schema(
    {
        user: {
            type: Schema.ObjectId,
            ref: "User", // Reference to the User who liked
            required: true,
        },
        article: {
            type: Schema.ObjectId,
            ref: "Article", // Optional reference to an Article
            default: null,
        },
        comment: {
            type: Schema.ObjectId,
            ref: "Comment", // Optional reference to a Comment
            default: null,
        },
    },
    { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
