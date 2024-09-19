import MediaItem from '@app/_types/media/MediaItem';
import { useState, useEffect } from 'react';
import { FindMediaItems } from '@app/(api)/_actions/media/findMediaItem';

export default function useMedia() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<MediaItem[]>([]);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    const fetchMedia = async () => {
      const res = await FindMediaItems();
      if (res.ok) {
        setData(res.body);
      } else {
        setError(res.error || '');
      }
      setLoading(false);
    };
    fetchMedia();
  }, []);

  return { loading, data, error };
}
