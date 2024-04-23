import jwt, { Secret } from 'jsonwebtoken';
import HttpError from '@utils/response/HttpError';

export async function verifyAuthToken(token: string) {
  try {
    const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET as Secret);

    if (!verifiedPayload) {
      throw new HttpError('Unauthorized. Invalid token.');
    }

    return { ok: true, body: verifiedPayload, error: null };
  } catch (e) {
    return { ok: false, body: null, error: e as HttpError };
  }
}
