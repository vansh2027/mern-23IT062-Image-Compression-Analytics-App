import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  originalName: String,
  compressedName: String,
  originalSize: Number,
  compressedSize: Number,
  uploadDate: { type: Date, default: Date.now }
});

export default mongoose.model('Image', imageSchema);
