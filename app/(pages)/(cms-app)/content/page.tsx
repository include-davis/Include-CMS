'use client';
import { useRouter } from 'next/navigation';
import schema from '@app/_utils/schema';
import { useEffect, useState } from 'react';
export default function Content() {
  const [status, setStatus] = useState('');
  const router = useRouter();
  useEffect(() => {
    const firstContentType = Object.keys(schema)?.[0];
    if (!firstContentType) {
      setStatus('No content types defined yet.');
    } else {
      router.push(`/content/${firstContentType}`);
      setStatus(`Redirecting to ${schema[firstContentType].getDisplayName()}`);
    }
  }, [router]);

  return status;
}
