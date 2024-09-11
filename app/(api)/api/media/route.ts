import { authenticatedRoute } from '@utils/auth/authenticatedRoute';
import { GET as get } from './get';
export const GET = authenticatedRoute(get);
export { POST } from './post';
