'use server';
import { MediaItem } from '@datatypes/media';
import HttpError from '@utils/response/HttpError';
import { v2 as cloudinary } from 'cloudinary';

export default async function uploadMedia(file: MediaItem) {
  try {
    console.log(file);
    const res = await cloudinary.uploader.upload(
      'https://cdn-prod.medicalnewstoday.com/content/images/articles/322/322868/golden-retriever-puppy.jpg'
    );
    console.log(res);
    return { ok: true, body: res, error: null };
  } catch (e) {
    const error = e as HttpError;
    return { ok: false, body: null, error: error.message };
  }
}
