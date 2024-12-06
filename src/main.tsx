import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.tsx';
import './index.css';
import { GOOGLE_CONFIG } from './config/google';

if (!GOOGLE_CONFIG.clientId) {
  console.error('Google Client ID is not configured. Please set VITE_GOOGLE_CLIENT_ID environment variable.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CONFIG.clientId}>
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);