import React from 'react';
import { Settings, LogOut } from 'lucide-react';
import { useGoogleAuth } from '../../contexts/GoogleAuthContext';
import { GoogleLoginButton } from './GoogleLoginButton';

export function GoogleCalendarSetup() {
  const { isAuthenticated, setCalendarConfig, logout } = useGoogleAuth();

  const handleSuccess = (response: any) => {
    setCalendarConfig({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      expiresAt: Date.now() + (response.expires_in || 3600) * 1000,
    });
  };

  const handleError = () => {
    console.error('Failed to connect to Google Calendar');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-gray-600" />
          <h2 className="text-xl font-semibold">Google Calendar Integration</h2>
        </div>
      </div>

      <div className="space-y-4">
        {isAuthenticated ? (
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-green-600 font-medium">Connected to Google Calendar</p>
              <p className="text-sm text-gray-600">Your calendar is synced and ready to use</p>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Connect your Google Calendar to sync your events
            </p>
            <GoogleLoginButton
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        )}
      </div>
    </div>
  );
}