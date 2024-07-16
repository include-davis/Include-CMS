import Media from './Media.mjs';
import typeSchema from '../../_configs/_schema/_index';
import generateTypes from './generateTypes';

const generatedSchema = {};
for (const [key, schema] of Object.entries(typeSchema)) {
  generatedSchema[key.toLowerCase()] = generateTypes(schema);
}

const schema = {
  ...generatedSchema,
  media: Media,
};

export default schema;
