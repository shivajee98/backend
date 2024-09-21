// /backend/routes/auth.router.js
import express from "express";
import passport from "passport";
import { generateTokens } from "../controllers/user.controller.js";

const router = express.Router();

// Route to initiate Google OAuth
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Google OAuth callback route
router.get("/google/callback", 
  passport.authenticate("google", { failureRedirect: "/" }),
  async (req, res) => {
    try {
      const user = req.user;
      if (!user) {
        throw new Error('User not found');
      }

      const tokens = await generateTokens(user._id);
      

      res.cookie('accessToken', tokens.accessToken, { httpOnly: true });
      res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

      // Redirect to the frontend root with a query parameter
      res.redirect(`http://localhost:5173/profile/${user._id}`);
    } catch (error) {
      console.error(error);
      res.redirect('/'); // Redirect to the failure page or handle error appropriately
    }
  }
);


// Route to logout
router.get("/logout", (req, res) => {
  res.clearCookie("accessToken"); // Remove the token from cookies if stored there
  res.clearCookie("refreshToken"); // Remove the refresh token from cookies if stored there
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Logout failed");
    }
    res.redirect("/");
  });
});

// Route to check authentication status
router.get('/status', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.json({ user: null });
  }
});

export default router;
