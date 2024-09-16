import { ContentSchema } from '@dist/index';
let schemaJSON;
try {
  schemaJSON = require('../../build-assets/schema.json');
} catch (e) {
  schemaJSON = {
    schema: {},
  };
}

const schema = ContentSchema.fromJSON(schemaJSON);
export default schema;
