'use client';
import { useContext } from 'react';

import { AuthContext } from '../_contexts/AuthContext';
import { AuthProviderValue } from '../_contexts/AuthContext';

export function useAuthContext(): AuthProviderValue {
  const context = useContext(AuthContext) as AuthProviderValue;
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
