// /backend/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import './config/passport.js'; // Import the Passport configuration

import userRouter from './routes/article.router.js';
import authRouter from './routes/auth.router.js'; // Import the auth routes
import profileRouter from './routes/user.router.js'; // Import profile routes
import authMiddleware from './middlewares/auth.middleware.js'; // Import the auth middleware
import { uploadImage } from "./controllers/upload.controller.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    credentials: true // Allow credentials (cookies, etc.)
}));

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(express.static("public"));
app.use(cookieParser());


// Initialize session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use("/auth", authRouter); // Use the auth routes
app.use("/api/articles",authMiddleware, userRouter);
app.use("/api/profile", profileRouter); // Add profile route to the application
app.post("/api/upload", uploadImage)

export { app };
