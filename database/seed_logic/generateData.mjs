import { faker } from '@faker-js/faker';

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
  }

  return data;
}

export default generateData;
