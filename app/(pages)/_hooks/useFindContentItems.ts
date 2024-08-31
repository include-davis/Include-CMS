'use client';
import { useState, useEffect } from 'react';
import { FindContentItems } from '@actions/content/findContentItem';

export default function useFindContentItems(
  content_type: string,
  query: object = {}
) {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<{ [_: string]: any }>({});

  useEffect(() => {
    const fetchContent = async () => {
      const contentItems = await FindContentItems(content_type, query);
      setRes(contentItems);
      setLoading(false);
    };

    fetchContent();
  }, [content_type, query]);

  return { loading, res };
}
