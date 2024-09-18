// src/routes/upload.routes.js
import express from 'express';
import { uploadImage } from '../controllers/upload.controller.js';

const router = express.Router();

router.post('/', uploadImage);

export default router;
