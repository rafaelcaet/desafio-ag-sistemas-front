"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { validateAuthToken, markTokenAsUsed, getSubmissionByToken, AuthToken } from '@/lib/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { email: string; name: string } | null;
  authenticate: (token: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (token) {
        authenticate(token);
      }
      
      const session = localStorage.getItem('auth_session');
      if (session) {
        try {
          const sessionData = JSON.parse(session);
          if (sessionData.expiresAt > Date.now()) {
            setIsAuthenticated(true);
            setUser(sessionData.user);
          } else {
            localStorage.removeItem('auth_session');
          }
        } catch (e) {
          localStorage.removeItem('auth_session');
        }
      }
    }
  }, []);

  const authenticate = (token: string): boolean => {
    const authToken = validateAuthToken(token);
    
    if (!authToken) {
      return false;
    }
    
    const submission = getSubmissionByToken(token);
    if (!submission) {
      return false;
    }
    
    markTokenAsUsed(token);
    
    const sessionData = {
      user: {
        email: submission.email,
        name: submission.name,
      },
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    };
    
    localStorage.setItem('auth_session', JSON.stringify(sessionData));
    setIsAuthenticated(true);
    setUser(sessionData.user);
    
    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', window.location.pathname);
    }
    
    return true;
  };

  const logout = () => {
    localStorage.removeItem('auth_session');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authenticate, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

