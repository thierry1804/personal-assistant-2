import { useEffect } from 'react';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';
import { useAuth } from '../contexts/AuthContext';

export function useAutoCalendarSetup() {
  const { isAuthenticated, setCalendarConfig } = useGoogleAuth();
  const { user } = useAuth();

  useEffect(() => {
    if (user && !isAuthenticated) {
      const accessToken = localStorage.getItem('googleAccessToken');
      if (accessToken) {
        setCalendarConfig({
          accessToken,
          refreshToken: '', // Not needed for implicit flow
          expiresAt: Date.now() + 3600 * 1000, // 1 hour from now
        });
      }
    }
  }, [user, isAuthenticated, setCalendarConfig]);
}