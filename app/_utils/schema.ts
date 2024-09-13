import { ContentSchema } from '@include/hearth';
import schemaJSON from '../../build-assets/schema.json';

const schema = ContentSchema.fromJSON(JSON.stringify(schemaJSON));
export default schema;
