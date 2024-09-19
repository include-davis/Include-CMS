import { authenticatedRoute } from '@utils/auth/authenticatedRoute';
import WithCallback from '@app/(api)/_utils/callback/withCallback';
import { POST as post } from './post';

export { GET } from './get';
export const POST = WithCallback(authenticatedRoute(post));
