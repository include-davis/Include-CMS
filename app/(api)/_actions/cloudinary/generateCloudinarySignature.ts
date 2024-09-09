'use server';
import HttpError from '@utils/response/HttpError';
import { v2 as cloudinary } from 'cloudinary';

export default async function GenerateCloudinarySignature(
  requestParams: object
) {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        ...requestParams,
      },
      process.env.CLOUDINARY_API_SECRET as string
    );

    const body = {
      cloudUrl: `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}`,
      requestParams: {
        api_key: process.env.CLOUDINARY_API_KEY,
        timestamp,
        signature,
        ...requestParams,
      },
    };
    return { ok: true, body, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
