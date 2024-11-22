// backend/models/comment.model.js
import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
