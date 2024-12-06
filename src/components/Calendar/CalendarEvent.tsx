import React from 'react';
import { Event } from '../../types';
import { formatTime } from '../../utils/dateUtils';

interface CalendarEventProps {
  event: Event;
}

export function CalendarEvent({ event }: CalendarEventProps) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md hover:bg-gray-50">
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
  );
}