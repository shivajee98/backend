// src/models/article.model.js
import mongoose, {Schema} from "mongoose";

const articleSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        paragraph : {
            type: String,
            required: true
        },
    }, 
    {timestamps: true})

    export const Article = mongoose.model("Article", articleSchema)
