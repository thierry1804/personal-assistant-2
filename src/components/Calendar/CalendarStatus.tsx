import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { useGoogleAuth } from '../../contexts/GoogleAuthContext';

export function CalendarStatus() {
  const { isAuthenticated } = useGoogleAuth();

  return (
    <div className="flex items-center gap-2 text-sm">
      {isAuthenticated ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-500" />
          <span className="text-green-600">Calendar Connected</span>
        </>
      ) : (
        <>
          <XCircle className="w-4 h-4 text-gray-400" />
          <span className="text-gray-500">Calendar Not Connected</span>
        </>
      )}
    </div>
  );
}