import films from '../_schema/films.mjs';

export async function up(db) {
  await db.createCollection('films', {
    validator: {
      $jsonSchema: films,
    },
  });
}

export async function down(db) {
  await db.collection('films').drop();
}
