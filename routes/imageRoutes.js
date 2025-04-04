import express from 'express';
import fs from 'fs';
import path from 'path';
import upload from '../middleware/upload.js';
import {
  uploadAndCompress,
  getAllImages,
  downloadImage,
  getAnalytics
} from '../controllers/imageController.js';

const router = express.Router();

// Existing routes
router.post('/', upload.single('image'), uploadAndCompress);
router.get('/', getAllImages);
router.get('/:id/download', downloadImage);
router.get('/analytics/stats', getAnalytics);

// ➜ New route: Fetch logs
router.get('/logs', (req, res) => {
  const logFilePath = path.join(process.cwd(), 'logs', 'activity.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: "Failed to read logs" });
    res.json(data.split('\n').filter((line) => line)); // Send logs as an array
  });
});

export default router;
