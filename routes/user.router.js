import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/profile.controller.js';

const router = express.Router();

// Get user profile
router.get('/:userId', getUserProfile);

// Update user profile
router.put('/:userId', updateUserProfile);

export default router;
