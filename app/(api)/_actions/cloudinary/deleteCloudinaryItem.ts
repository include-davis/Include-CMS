'use server';
import HttpError from '@utils/response/HttpError';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function DeleteCloudinaryObject(
  cloudinary_id: string,
  type: string
) {
  try {
    const result = await cloudinary.uploader.destroy(cloudinary_id, {
      resource_type: type,
    });
    return {
      ok: true,
      body: result,
      error: null,
    };
  } catch (e) {
    const err = e as HttpError;
    return {
      ok: false,
      body: null,
      error: err.message,
    };
  }
}
