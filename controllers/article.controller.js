// src/controller/article.controller.js
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { Article } from '../models/article.model.js'
import { ApiResponse } from "../utils/ApiResponse.js"



const postArticle = asyncHandler(async (req, res) => {
    const { title, paragraph } = req.body;

    if (!title || !paragraph) {
        throw new ApiError(400, "Title and content are required");
    }

    const article = await Article.create({ title, paragraph });
    const createdPost = await Article.findById(article._id);

    if (!createdPost) {
        throw new ApiError(500, "Failed to create article");
    }

    return res.status(201).json(new ApiResponse(200, createdPost, "Article posted successfully"));
});

const getArticles = async (req, res) => {
    try {
      const articles = await Article.find(); // Fetch all articles from MongoDB
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  };

  const getSpecificArticle = asyncHandler(async(req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if(!article) throw new ApiError(404, "Post Not Found")
      res.json(article)
    } catch (error) {
      throw new ApiError(404, error.message || "Invalid Request")
    }
  });

export {
    postArticle,
    getArticles,
    getSpecificArticle
}
