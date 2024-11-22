// backend/controllers/upload.controller.js
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



export const uploadVideo = async (req, res) => {
    try {
        const { base64Video } = req.body; // Extract base64 video from the request body

        if (!base64Video) {
            return res.status(400).json({ message: "Video data is required" });
        }

        // Upload to Cloudinary as a video
        const response = await cloudinary.uploader.upload(base64Video, {
            resource_type: "video",  // This tells Cloudinary the file type is video
            public_id: `videos/${Date.now()}`, // Optionally specify a unique ID for the video
        });

        // Respond with the secure URL of the uploaded video
        return res.status(200).json({ videoUrl: response.secure_url });
    } catch (error) {
        console.error("Error uploading video to Cloudinary:", error);
        return res.status(500).json({ message: "Failed to upload video" });
    }
};


export const uploadImage = async (req, res) => {
    try {
        const { base64Image } = req.body; // Extract base64 image from the request body

        if (!base64Image) {
            return res.status(400).json({ message: "Image data is required" });
        }

        const response = await cloudinary.uploader.upload(base64Image, {
            resource_type: "image"
        });

        return res.status(200).json({ imageUrl: response.secure_url }); // Return the URL of the uploaded image
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        return res.status(500).json({ message: "Failed to upload image" });
    }
};
