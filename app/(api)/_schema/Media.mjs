import mongoose from 'mongoose';

const MediaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  altText: { type: String },
  mediaUrl: { type: String, required: true },
  dateAdded: { type: Date, default: Date.now }
});

export default mongoose.models.Media || mongoose.model('Media', MediaSchema);
