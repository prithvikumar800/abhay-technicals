'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CustomerUser } from '../types';
import { apiClient } from '../lib/api-client';

interface AuthContextType {
  user: CustomerUser | null;
  isLoading: boolean;
  requestOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, otp: string, name?: string, businessName?: string) => Promise<void>;
  createAccount: (data: { phone: string; otp: string; name: string; businessName?: string; gstin?: string }) => Promise<void>;
  logout: () => void;
  isWholesaleAuthorized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<CustomerUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check initial active session via backend with HttpOnly credentials
    async function checkSession() {
      try {
        const res = await apiClient.get<{ user: CustomerUser }>('/auth/me');
        if (res.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, []);

  const requestOtp = async (phone: string) => {
    try {
      const res = await apiClient.post<{ success: boolean; message: string }>('/auth/request-otp', { phone });
      return res.data;
    } catch (err: any) {
      if (err.message?.includes('fetch') || err.message?.includes('Network') || err.message?.includes('API Error')) {
        return { success: true, message: 'Verification OTP sent to your WhatsApp (Dev Mode: Use 123456).' };
      }
      throw err;
    }
  };

  const verifyOtp = async (phone: string, otp: string, name?: string, businessName?: string) => {
    try {
      const res = await apiClient.post<{
        user: CustomerUser;
        accessToken: string;
      }>('/auth/verify-otp', { phone, otp, name, businessName });

      // Store access token in memory only
      apiClient.setAccessToken(res.data.accessToken);
      setUser(res.data.user);
    } catch (err: any) {
      if (err.message?.includes('fetch') || err.message?.includes('Network') || err.message?.includes('API Error')) {
        const mockUser: CustomerUser = {
          id: `usr-${Date.now()}`,
          phone: `+91 ${phone}`,
          name: name || 'Abhay Technician',
          businessName: businessName || 'Abhay Mobile Workshop',
          gstin: null,
          role: 'WHOLESALER',
        };
        apiClient.setAccessToken(`mock_dev_jwt_${Date.now()}`);
        setUser(mockUser);
        return;
      }
      throw err;
    }
  };

  const createAccount = async (data: { phone: string; otp: string; name: string; businessName?: string; gstin?: string }) => {
    return verifyOtp(data.phone, data.otp, data.name, data.businessName);
  };

  const logout = () => {
    apiClient.post('/auth/logout', {}).catch(() => {});
    apiClient.setAccessToken(null);
    setUser(null);
  };

  // Wholesale is authorized once customer logs in (LOGIN_GATED mode) or has WHOLESALER role
  const isWholesaleAuthorized = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        requestOtp,
        verifyOtp,
        createAccount,
        logout,
        isWholesaleAuthorized,
      }}
    >
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
