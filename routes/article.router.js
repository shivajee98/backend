// backend/routes/article.router.js
import { Router } from "express";
import { postArticle, getArticles, getSpecificArticle } from "../controllers/article.controller.js";

const router = Router();

router.route("/post").post(postArticle);
router.route("/").get(getArticles); // Add this route to fetch articles
router.route("/:id").get(getSpecificArticle)

export default router;
