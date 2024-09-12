'use client';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
export default function AuthFailureRedirect() {
  const router = useRouter();
  const currentPath = usePathname();

  useEffect(() => {
    const loginUrl = new URL('/login', window.location.origin);
    loginUrl.searchParams.set('redirect', currentPath);
    router.push(loginUrl.toString());
  }, [router, currentPath]);

  return <div>User not authenticated, redirecting to login...</div>;
}
