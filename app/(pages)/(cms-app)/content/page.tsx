'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import schema from '@app/_utils/schema';
export default function Content() {
  const [status, setStatus] = useState('');
  const router = useRouter();
  useEffect(() => {
    const firstContentType = schema.getNames()?.[0];
    if (!firstContentType) {
      setStatus('No content types defined yet.');
    } else {
      router.push(`/content/${firstContentType}`);
      setStatus(
        `Redirecting to ${schema.get(firstContentType)?.getPluralDisplayName()}`
      );
    }
  }, [router]);
  return status;
}
