import fs from 'fs';
import path from 'path';
import Image from '../models/Image.js';
import sharp from 'sharp';
import { logger } from '../config/logger.js';

export const uploadAndCompress = async (req, res) => {
  try {
    const originalPath = req.file.path;
    const compressedPath = `server/uploads/compressed-${req.file.filename}`;

    await sharp(originalPath)
      .resize(800)
      .jpeg({ quality: 60 })
      .toFile(compressedPath);

    const statsOriginal = fs.statSync(originalPath);
    const statsCompressed = fs.statSync(compressedPath);

    const newImage = await Image.create({
      originalName: req.file.originalname,
      originalPath,
      compressedPath,
      originalSize: statsOriginal.size,
      compressedSize: statsCompressed.size,
    });

    logger.info(`Image uploaded and compressed: ${req.file.originalname}`);
    res.status(201).json(newImage);
  } catch (err) {
    logger.error(`Upload Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to upload and compress image' });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    logger.error(`Fetch Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
};

export const downloadImage = (req, res) => {
  const imageId = req.params.id;
  Image.findById(imageId).then((image) => {
    if (!image) return res.status(404).json({ error: 'Image not found' });

    logger.info(`Image downloaded: ${image.originalName}`);
    res.download(path.resolve(image.compressedPath));
  }).catch((err) => {
    logger.error(`Download Error: ${err.message}`);
    res.status(500).json({ error: 'Download failed' });
  });
};

export const getAnalytics = async (req, res) => {
  try {
    const stats = await Image.aggregate([
      {
        $group: {
          _id: null,
          totalOriginalSize: { $sum: '$originalSize' },
          totalCompressedSize: { $sum: '$compressedSize' },
          totalImages: { $sum: 1 },
        },
      },
    ]);

    const { totalOriginalSize, totalCompressedSize, totalImages } = stats[0] || {};
    const totalSaved = totalOriginalSize - totalCompressedSize;

    res.json({
      totalImages,
      totalOriginalSize,
      totalCompressedSize,
      totalSaved,
      reductionPercent: ((totalSaved / totalOriginalSize) * 100).toFixed(2),
    });
  } catch (err) {
    logger.error(`Analytics Error: ${err.message}`);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
};

