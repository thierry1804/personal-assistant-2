import React from 'react';
import { Calendar as CalendarIcon, Loader, Plus } from 'lucide-react';
import { Event } from '../../types';
import { formatTime } from '../../utils/dateUtils';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';
import { CalendarStatus } from './CalendarStatus';
import { CalendarEvent } from './CalendarEvent';

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
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <CalendarIcon className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Calendar</h2>
          </div>
          <CalendarStatus />
        </div>
        <button
          onClick={onAddEvent}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Event
        </button>
      </div>
      
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center">
            {error}
          </div>
        ) : todayEvents.length === 0 ? (
          <div className="p-8 text-center">
            <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No events scheduled for today</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {todayEvents.map(event => (
              <CalendarEvent key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}