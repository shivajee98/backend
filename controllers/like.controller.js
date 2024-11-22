// src/controllers/like.controller.js
import { Article } from "../models/article.model.js";
import { ApiError } from "../utils/ApiError.js";

export const toggleLike = async (req, res) => {
    try {
        const articleId = req.params.id;
        const userId = req.user._id;  // Assume req.user contains the authenticated user's info

        // Find the article by ID
        const article = await Article.findById(articleId);
        if (!article) {
            throw new ApiError(404, "Article not found");
        }

        // Check if the user has already liked the article
        const userIndex = article.likedBy.indexOf(userId);

        if (userIndex !== -1) {
            // User already liked the article, so we remove the like
            article.likedBy.splice(userIndex, 1);  // Remove user ID from likedBy array
            article.likes -= 1;  // Decrement likes count
            await article.save();

            return res.status(200).json({
                success: true,
                message: "Like removed successfully",
                likes: article.likes
            });
        } else {
            // User has not liked the article, so we add the like
            article.likedBy.push(userId);  // Add user ID to likedBy array
            article.likes += 1;  // Increment likes count
            await article.save();

            return res.status(200).json({
                success: true,
                message: "Like added successfully",
                likes: article.likes
            });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
