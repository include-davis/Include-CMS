import weddings from '../app/(api)/_schema/weddings.mjs';

export async function up(db) {
  await db.createCollection('weddings', {
    validator: {
      $jsonSchema: weddings,
    },
  });
}

export async function down(db) {
  await db.collection('weddings').drop();
}
