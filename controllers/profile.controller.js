// controllers/profileController.js

import { User } from "../models/users.model.js";

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    // Set undefined or empty fields to null in the request body
    const updateData = {};
    for (const key in req.body) {
      if (req.body[key] === undefined || req.body[key] === '') {
        updateData[key] = null; // Set to null if not provided or empty
      } else {
        updateData[key] = req.body[key];
      }
    }

    // Find and update the user
    const user = await User.findByIdAndUpdate(req.params.userId, updateData, {
      new: true,
    });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
