import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import { useNavigate, useLocation } from 'react-router-dom';
import { GOOGLE_CONFIG } from '../config/google';

interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse: TokenResponse) => {
      try {
        const userInfo = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        }).then(res => res.json());

        const userData: User = {
          id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('googleAccessToken', tokenResponse.access_token);
        
        if (location.pathname === '/login') {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        throw error;
      }
    },
    onError: (error) => {
      console.error('Login Failed:', error);
      throw error;
    },
    scope: GOOGLE_CONFIG.scopes.join(' '),
    flow: GOOGLE_CONFIG.flowType,
  });

  const login = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('googleAccessToken');
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
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