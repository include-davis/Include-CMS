'use client';
import { createContext, useState, useEffect, useCallback } from 'react';
import VerifyAuthToken from '@actions/auth/verifyAuthToken';
import { AuthToken } from '@app/_types/auth/AuthToken';
import Logout from '@actions/auth/logout';

interface AuthProviderValue {
  user: AuthToken;
  loading: boolean;
  login: (user: AuthToken) => void;
  logout: () => void;
}

export type { AuthProviderValue };

export const AuthContext = createContext({});

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<AuthToken | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateAuth = async () => {
      const data = await VerifyAuthToken();
      if (!data.ok) {
        setLoading(false);
        return;
      }
      const userData = data.body as AuthToken;

      setUser(userData);
      setLoading(false);
    };

    updateAuth();
  }, []);

  const login = useCallback((user: AuthToken | null) => {
    setUser(user);
  }, []);

  const logout = useCallback(() => {
    Logout();
    setUser(null);
  }, []);

  const contextValue = { user, loading, login, logout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
