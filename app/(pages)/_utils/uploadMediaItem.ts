import GenerateCloudinarySignature from '@actions/cloudinary/generateCloudinarySignature';
import { CreateMediaItem } from '@actions/media/createMediaItem';
import HttpError from '@utils/response/HttpError';
import MediaItem from '@typeDefs/media/MediaItem';
import DeleteCloudinaryObject from '@actions/cloudinary/deleteCloudinaryItem';

export default async function uploadMediaItem(mediaItem: MediaItem) {
  try {
    const cloudinaryType = getCloudinaryType(mediaItem.type);
    const fileRes = await fetch(mediaItem.src);
    const file = await fileRes.blob();

    const requestParams = {};
    const signatureRes = await GenerateCloudinarySignature(requestParams);
    if (!signatureRes.ok) {
      throw new HttpError(signatureRes.error || 'Internal Server Error');
    }

    const uploadBody = new FormData();
    Object.entries(signatureRes.body?.requestParams || {}).forEach(
      ([key, value]) => {
        uploadBody.append(key, (value || '').toString());
      }
    );

    uploadBody.append('file', file);
    const uploadRes = await fetch(
      `${signatureRes.body?.cloudUrl}/${cloudinaryType}/upload`,
      {
        method: 'POST',
        body: uploadBody,
      }
    );

    const uploadData = await uploadRes.json();

    if (uploadData.error) {
      throw new HttpError(uploadData.error.message);
    }

    const updatedMediaItem = {
      ...mediaItem,
      cloudinary_id: uploadData.public_id,
      src: uploadData.secure_url,
      height: uploadData.height || null,
      width: uploadData.width || null,
    };

    const { _id: _, ...creationBody } = updatedMediaItem;

    const creationRes = await CreateMediaItem(creationBody);
    if (!creationRes.ok) {
      const deleteStatus = await DeleteCloudinaryObject(
        updatedMediaItem.cloudinary_id,
        getCloudinaryType(updatedMediaItem.type)
      );
      const errorMsg = `${creationRes.error}${
        deleteStatus.ok ? '' : `\n${deleteStatus.error}`
      }`;
      throw new Error(errorMsg);
    }

    return creationRes;
  } catch (e) {
    const err = e as HttpError;
    return { ok: false, body: null, error: err.message };
  }
}

function getCloudinaryType(type: string) {
  if (type === 'video') {
    return type;
  } else {
    return 'image';
  }
}
