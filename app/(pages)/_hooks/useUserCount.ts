'use client';
import { useState, useEffect } from 'react';
import { CountUsers } from '@app/(api)/_actions/auth/countUsers';
export default function useUserCount() {
  const [loading, setLoading] = useState(true);
  const [userCount, setUserCount] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await CountUsers();
      if (res.ok) {
        setUserCount(res.body);
      } else {
        setError(res.error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  return { loading, userCount, error };
}
