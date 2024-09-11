'use client';
import { useState, useEffect } from 'react';
import { FindContentItems } from '@actions/content/findContentItem';
import CMSResponse from '@typeDefs/response/Response';

export default function useFindContentItems(
  content_type: string,
  query: object = {}
) {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<CMSResponse>({
    ok: false,
    body: null,
    error: null,
  });

  const safeQuery = JSON.stringify(query);

  useEffect(() => {
    const fetchContent = async () => {
      const contentItems = await FindContentItems(
        content_type,
        JSON.parse(safeQuery)
      );
      setRes(contentItems);
      setLoading(false);
    };

    fetchContent();
  }, [content_type, safeQuery]);

  return { loading, res };
}
