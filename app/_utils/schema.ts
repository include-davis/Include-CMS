import { ContentSchema } from '@include/hearth';
import schemaJSON from '../../build-assets/schema.json';

const schema = ContentSchema.fromJSON(schemaJSON);
export default schema;
