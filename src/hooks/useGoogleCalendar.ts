import { useState, useEffect } from 'react';
import { Event } from '../types';
import { GoogleCalendarService } from '../services/GoogleCalendarService';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';

export function useGoogleCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, calendarConfig } = useGoogleAuth();

  useEffect(() => {
    async function fetchEvents() {
      if (!isAuthenticated || !calendarConfig) return;

      setIsLoading(true);
      setError(null);

      try {
        const calendarEvents = await GoogleCalendarService.fetchEvents();
        setEvents(calendarEvents);
      } catch (err) {
        setError('Failed to fetch calendar events');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEvents();
    // Refresh events every 5 minutes
    const intervalId = setInterval(fetchEvents, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [isAuthenticated, calendarConfig]);

  return { events, isLoading, error };
}