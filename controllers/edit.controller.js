import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Article } from "../models/article.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/users.model.js";


// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    const { name, email, ...otherUpdates } = req.body;

    // Only allow the authenticated user to update their own profile
    const user = await User.findByIdAndUpdate(req.user._id, { name, email, ...otherUpdates }, { new: true });

    if (!user) {
        return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ message: 'Profile updated successfully.', user });
} catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
}
});


const updateArticle = asyncHandler(async (req, res) => {
    const { title, paragraph } = req.body;
  
    // Check if user is authenticated
    if (!req.user || !req.user._id) {
      throw new ApiError(401, "Unauthorized: User not logged in");
    }
  
    // Check if title and paragraph are provided
    if (!title || !paragraph) {
      throw new ApiError(400, "Title and content are required");
    }
  
    // Find the article by ID and update it
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      { title, paragraph },
      { new: true } // Return the updated article
    ).populate('author', 'fullName username');
  
    if (!article) {
      throw new ApiError(404, "Article not found");
    }
  
    return res.status(200).json(new ApiResponse(200, article, "Article updated successfully"));
  });
  

export { updateUserProfile, updateArticle}