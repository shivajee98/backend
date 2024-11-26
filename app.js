import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import { v2 as cloudinary } from "cloudinary"; // Import Cloudinary
import './config/passport.js'; // Passport config
import userRouter from './routes/article.router.js';
import editRouter from './routes/articleEditor.router.js'; 
import authRouter from './routes/auth.router.js';
import profileRouter from './routes/user.router.js';
import authMiddleware from './middlewares/auth.middleware.js';
import uploadRouter  from "./routes/upload.router.js";
import updateUser from "./routes/userUpdate.router.js";
import searchRouter from "./routes/search.router.js"
import commentRouter from './routes/comment.router.js';
import { Shorts } from './models/shorts.model.js';  // Ensure this model exists
import likeRouter from './routes/like.routes.js';

const app = express();

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Basic middlewares setup
app.use(cors({
    origin: ['http://localhost:5173', 'http://54.162.160.221'], // Your frontend origin
    credentials: true // Allow credentials (cookies, etc.)
}));

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));
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
app.use("/api/articles", userRouter); // Authenticated articles routes
app.use("/api/articles", authMiddleware, commentRouter); // Authenticated articles routes
app.use("/api/edit", authMiddleware, editRouter); // Authenticated and edit-specific routes
app.use("/api/user", authMiddleware, updateUser); // Authenticated user update routes
app.use("/api/profile", profileRouter); // Public profile routes

// Route to upload video
app.post('/api/upload/video', async (req, res) => {
    try {
        const { base64Video } = req.body; // Extract base64 video from the request body

        if (!base64Video) {
            return res.status(400).json({ message: "Video data is required" });
        }

        // Upload the base64-encoded video to Cloudinary
        const response = await cloudinary.uploader.upload(base64Video, {
            resource_type: "video",  // Specify it's a video
            public_id: `videos/${Date.now()}`, // Optionally specify a unique ID for the video
        });

        // Save the Cloudinary video URL to MongoDB
        const article = new Shorts({
            links: [response.secure_url] // Save the video URL to the `links` array
        });

        await article.save();

        return res.status(200).json({ videoUrl: response.secure_url });
    } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
        return res.status(500).json({ message: "Failed to upload video" });
    }
});

// Route to get all videos from Shorts collection
app.get('/api/videos', async (req, res) => {
    try {
        // Find all shorts (videos)
        const shorts = await Shorts.find();

        // Extract video URLs (assuming each 'links' array contains at least one video)
        const videos = shorts.map(short => ({
            url: short.links[0] // Assuming only one video per short for now
        }));

        // Send video URLs to frontend
        return res.status(200).json({ videos });
    } catch (error) {
        console.error("Error fetching videos:", error);
        return res.status(500).json({ message: "Failed to fetch videos" });
    }
});

// Other routes
app.use("/api/search", searchRouter); // Search Router
app.post("/api/upload/video", uploadRouter);
app.use("/api/articles", authMiddleware, likeRouter);  // Like router

export { app };
