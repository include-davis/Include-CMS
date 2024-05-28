import mongoose from 'mongoose';

const CollectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String },
  mediaList: { type: [String] } // Array of media IDs
});

export default mongoose.models.Collection || mongoose.model('Collection', CollectionSchema);

//TODO: request more clarification on how collection and media collection are connected