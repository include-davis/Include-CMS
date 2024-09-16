import { authenticatedRoute } from '@app/(api)/_utils/auth/authenticatedRoute';
import { PUT as put } from './put';
import { DELETE as del } from './delete';

export { GET } from './get';
export const PUT = authenticatedRoute(put);
export const DELETE = authenticatedRoute(del);
