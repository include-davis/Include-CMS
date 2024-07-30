import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';

function generateData(collectionName, numDocuments) {
  let data = [];
  if (collectionName === 'media') {
    data = Array.from({ length: numDocuments }, () => ({
      media_type: faker.lorem.word(),
      name: faker.lorem.word(),
      alt_text: faker.lorem.sentence(),
      media_url: faker.internet.url(),
      preview_url: faker.internet.url(),
      date_added: faker.date.past(),
    }));
  } else if (collectionName === 'films') {
    data = Array.from({ length: numDocuments }, () => ({
      title: faker.lorem.word(),
      date: faker.date.past(),
      description: faker.lorem.sentence(),
      film: Array.from({ length: 3 }, () => new ObjectId()),
    }));
  } else if (collectionName === 'weddings') {
    data = Array.from({ length: numDocuments }, () => ({
      title: faker.lorem.word(),
      date: faker.date.past(),
      description: faker.lorem.sentence(),
      photo_gallery: Array.from({ length: 3 }, () => new ObjectId()),
      message_for_groom: faker.lorem.sentence(),
      message_for_bride: faker.lorem.sentence(),
      blooper_photos: Array.from({ length: 3 }, () => new ObjectId()),
    }));
  }

  return data;
}

export default generateData;
