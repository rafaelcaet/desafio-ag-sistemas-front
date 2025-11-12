"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAdminAuthenticated, adminLogin, adminLogout, getAdminEmail } from '@/lib/auth';

interface AdminContextType {
  isAdmin: boolean;
  adminEmail: string | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authenticated = isAdminAuthenticated();
      setIsAdmin(authenticated);
      if (authenticated) {
        setAdminEmail(getAdminEmail());
      }
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const success = adminLogin(email, password);
    if (success) {
      setIsAdmin(true);
      setAdminEmail(email);
    }
    return success;
  };

  const logout = () => {
    adminLogout();
    setIsAdmin(false);
    setAdminEmail(null);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, adminEmail, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

