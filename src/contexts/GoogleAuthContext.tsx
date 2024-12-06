import React, { createContext, useContext, useState, useEffect } from 'react';
import { GoogleCalendarConfig } from '../types';

interface GoogleAuthContextType {
  isAuthenticated: boolean;
  calendarConfig: GoogleCalendarConfig | null;
  setCalendarConfig: (config: GoogleCalendarConfig) => void;
  logout: () => void;
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined);

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  const [calendarConfig, setCalendarConfig] = useState<GoogleCalendarConfig | null>(() => {
    try {
      const stored = localStorage.getItem('googleCalendarConfig');
      if (!stored) return null;
      
      const config = JSON.parse(stored);
      // Check if token is expired
      if (config.expiresAt < Date.now()) {
        localStorage.removeItem('googleCalendarConfig');
        return null;
      }
      return config;
    } catch {
      localStorage.removeItem('googleCalendarConfig');
      return null;
    }
  });

  useEffect(() => {
    if (calendarConfig) {
      localStorage.setItem('googleCalendarConfig', JSON.stringify(calendarConfig));
    } else {
      localStorage.removeItem('googleCalendarConfig');
    }
  }, [calendarConfig]);

  const logout = () => {
    setCalendarConfig(null);
    localStorage.removeItem('googleCalendarConfig');
  };

  return (
    <GoogleAuthContext.Provider
      value={{
        isAuthenticated: !!calendarConfig && calendarConfig.expiresAt > Date.now(),
        calendarConfig,
        setCalendarConfig,
        logout,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  );
}

export function useGoogleAuth() {
  const context = useContext(GoogleAuthContext);
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider');
  }
  return context;
}