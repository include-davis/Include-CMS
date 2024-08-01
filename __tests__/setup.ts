import '@testing-library/jest-dom';
import { MongoClient } from 'mongodb';

let client;
let db;

beforeAll(async () => {
  client = await MongoClient.connect((global as any).__MONGO_URI__, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as any);
  db = await client.db();

  // Make the client available globally
  (global as any).__MONGO_CLIENT__ = client;

  await db.createCollection('media', {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        title: 'Media Object Validation',
        properties: {
          _id: {
            bsonType: 'objectId',
            description: '_id must be an ObjectId',
          },
          media_type: {
            bsonType: 'string',
            description: 'Media Type must be a string',
          },
          name: {
            bsonType: 'string',
            description: 'Name must be a string',
          },
          alt_text: {
            bsonType: 'string',
            description: 'Alternative text must be a string',
          },
          media_url: {
            bsonType: 'string',
            description: 'Media url must be a string',
          },
          preview_url: {
            bsonType: 'string',
            description: 'Preview url must be a string',
            required: function () {
              return this.media_type === 'video'; // Preview URL required only for videos
            },
          },
          date_added: {
            type: Date,
            default: Date.now,
          },
        },
      },
    },
  });
});
