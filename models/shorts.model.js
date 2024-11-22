// src/models/article.model.js
import mongoose, { Schema } from "mongoose";

const shortsSchema = new Schema(
    {
        links: [
            {
                type: String,
                required: true
            }
        ]
    },
    { timestamps: true }
);

export const Shorts = mongoose.model("Shorts", shortsSchema);
