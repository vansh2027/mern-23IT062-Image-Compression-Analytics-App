import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import connectDB from './config/database.js';
import imageRoutes from './routes/imageRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/images', imageRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
