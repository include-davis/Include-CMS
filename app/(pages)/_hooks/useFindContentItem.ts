'use client';
import { useState, useEffect } from 'react';
import { FindContentItem } from '@actions/content/findContentItem';

export default function useFindContentItem(content_type: string, id: string) {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<{ [_: string]: any }>({});

  useEffect(() => {
    const fetchContent = async () => {
      const contentItem = await FindContentItem(content_type, id);
      setRes(contentItem);
      setLoading(false);
    };

    fetchContent();
  }, [content_type, id]);

  return { loading, res };
}
