'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminUser } from '../types';
import { apiClient } from './api-client';

interface AuthContextType {
  user: AdminUser | null;
  isLoading: boolean;
  requestOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check initial session with backend via HttpOnly cookie or in-memory token
    async function checkSession() {
      try {
        const res = await apiClient.get<{ user: AdminUser }>('/auth/me');
        if (res.data?.user && (res.data.user.role === 'ADMIN' || res.data.user.role === 'STAFF')) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        // Unauthenticated or expired session
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  useEffect(() => {
    // Route protection guard
    if (!isLoading) {
      const isAuthRoute = pathname.startsWith('/login');
      if (!user && !isAuthRoute) {
        router.replace('/login');
      } else if (user && isAuthRoute) {
        router.replace('/');
      }
    }
  }, [user, isLoading, pathname, router]);

  const requestOtp = async (phone: string) => {
    const res = await apiClient.post<{ success: boolean; message: string }>('/auth/request-otp', { phone });
    return res.data;
  };

  const verifyOtp = async (phone: string, otp: string) => {
    const res = await apiClient.post<{
      user: AdminUser;
      accessToken: string;
    }>('/auth/verify-otp', { phone, otp });

    const verifiedUser = res.data.user;

    // Strict Role Check: Reject non-staff customers
    if (verifiedUser.role !== 'ADMIN' && verifiedUser.role !== 'STAFF') {
      apiClient.setAccessToken(null);
      setUser(null);
      throw new Error('Access Denied: This portal requires Administrative or Staff privileges.');
    }

    // Save access token purely in memory
    apiClient.setAccessToken(res.data.accessToken);
    setUser(verifiedUser);
    router.replace('/');
  };

  const logout = () => {
    apiClient.post('/auth/logout', {}).catch(() => {});
    apiClient.setAccessToken(null);
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, requestOtp, verifyOtp, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
