import { Event } from '../types';
import { useGoogleAuth } from '../contexts/GoogleAuthContext';

export class GoogleCalendarService {
  static async fetchEvents(): Promise<Event[]> {
    const timeMin = new Date();
    timeMin.setHours(0, 0, 0, 0);
    const timeMax = new Date();
    timeMax.setDate(timeMax.getDate() + 30); // Get events for next 30 days

    try {
      const response = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${timeMin.toISOString()}&timeMax=${timeMax.toISOString()}&singleEvents=true&orderBy=startTime`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('googleAccessToken')}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch calendar events');
      }

      const data = await response.json();
      
      return data.items.map((item: any) => ({
        id: item.id,
        title: item.summary,
        description: item.description,
        startTime: new Date(item.start.dateTime || item.start.date),
        endTime: new Date(item.end.dateTime || item.end.date),
        location: item.location,
      }));
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      throw error;
    }
  }
}