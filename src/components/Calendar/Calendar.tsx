import React from 'react';
import { Calendar as CalendarIcon, Loader } from 'lucide-react';
import { Event } from '../../types';
import { formatTime } from '../../utils/dateUtils';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';

interface CalendarProps {
  onAddEvent: () => void;
}

export function Calendar({ onAddEvent }: CalendarProps) {
  const { events, isLoading, error } = useGoogleCalendar();
  const today = new Date();
  const todayEvents = events.filter(
    event => event.startTime.toDateString() === today.toDateString()
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold">Calendar</h2>
        </div>
        <button
          onClick={onAddEvent}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Add Event
        </button>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">{error}</div>
        ) : todayEvents.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No events scheduled for today</p>
        ) : (
          todayEvents.map(event => (
            <div
              key={event.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex-1">
                <h3 className="font-medium">{event.title}</h3>
                <p className="text-sm text-gray-600">
                  {formatTime(event.startTime)} - {formatTime(event.endTime)}
                </p>
                {event.location && (
                  <p className="text-sm text-gray-500">{event.location}</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}