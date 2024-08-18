import media from '../app/(api)/_schema/media.mjs';

export async function up(db) {
  await db.createCollection('media', {
    validator: {
      $jsonSchema: media,
    },
  });
}

export async function down(db) {
  await db.collection('media').drop();
}
