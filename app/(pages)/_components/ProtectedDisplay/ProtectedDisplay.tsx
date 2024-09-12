'use client';
import { useAuthContext } from '@hooks/useAuthContext';

export default function ProtectedDisplay({
  loadingDisplay = 'loading...',
  failDisplay = 'User not authenticated',
  children,
}: {
  loadingDisplay?: React.ReactNode;
  failDisplay?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthContext();
  if (loading) {
    return loadingDisplay;
  }
  if (user === null) {
    return failDisplay;
  } else {
    return children;
  }
}
