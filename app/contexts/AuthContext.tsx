"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for token on initial load
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const userData = localStorage.getItem('user') || sessionStorage.getItem('user');
      const expires = localStorage.getItem('expires') || sessionStorage.getItem('expires');
      
      if (token && userData && expires) {
        // Check if token is expired
        if (parseInt(expires) > Date.now() / 1000) {
          // Token is valid
          setUser(JSON.parse(userData));
        } else {
          // Token is expired, clear it
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('expires');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('expires');
        }
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);
  
  // Redirect to login if accessing protected route without authentication
  useEffect(() => {
    if (!isLoading && !user && pathname?.startsWith('/dashboard')) {
      router.push('/login');
    }
  }, [user, isLoading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost/cyber-x-radar/server/api/auth/auth.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (data.status === 'success') {
        setUser(data.user);
        
        // Store authentication data based on remember me (assumed to be in localStorage already)
        const storageType = localStorage.getItem('rememberMe') === 'true' ? localStorage : sessionStorage;
        
        storageType.setItem('token', data.token);
        storageType.setItem('user', JSON.stringify(data.user));
        storageType.setItem('expires', data.expires.toString());
        
        setIsLoading(false);
        return true;
      } else {
        setIsLoading(false);
        return false;
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoading(false);
      return false;
    }
  };
  
  const logout = () => {
    // Clear auth data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('expires');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expires');
    
    setUser(null);
    router.push('/login');
  };
  
  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout }}>
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
