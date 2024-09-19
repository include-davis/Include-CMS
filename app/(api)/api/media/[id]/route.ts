import { authenticatedRoute } from '@app/(api)/_utils/auth/authenticatedRoute';
import WithCallback from '@app/(api)/_utils/callback/withCallback';
import { PUT as put } from './put';
import { DELETE as del } from './delete';

export { GET } from './get';
export const PUT = WithCallback(authenticatedRoute(put));
export const DELETE = WithCallback(authenticatedRoute(del));
