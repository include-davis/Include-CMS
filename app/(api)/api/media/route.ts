import { authenticatedRoute } from '@utils/auth/authenticatedRoute';
import { POST as post } from './post';

export { GET } from './get';
export const POST = authenticatedRoute(post);
