import weddings from './weddings';
import films from './films';
import { Schema } from './_types';

const schema = { weddings, films } as { [key: string]: Schema };

export default schema;
