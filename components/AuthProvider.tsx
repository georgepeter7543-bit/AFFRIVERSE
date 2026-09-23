'use client';

import React, { ReactNode, useEffect } from 'react';
import { useStore } from '@/lib/store';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setCurrentUser, currentUser } = useStore();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem('afriverse_active_session');
      if (raw) {
        const session = JSON.parse(raw);
        if (session && session.id && session.role) {
          setCurrentUser(session);
        }
      }
    } catch {
      // corrupt session — ignore
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
};
