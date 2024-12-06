import { toast } from 'react-toastify';
import { addMinutes, isAfter, isBefore } from 'date-fns';
import { Event, Task } from '../types';

class NotificationService {
  private checkInterval: number = 60000; // Check every minute
  private intervalId: number | null = null;
  private notifiedEvents: Set<string> = new Set();
  private notifiedTasks: Set<string> = new Set();

  constructor() {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }

  startMonitoring(events: Event[], tasks: Task[]) {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = window.setInterval(() => {
      this.checkUpcomingEvents(events);
      this.checkUpcomingTasks(tasks);
    }, this.checkInterval);
  }

  stopMonitoring() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private checkUpcomingEvents(events: Event[]) {
    const now = new Date();
    const soon = addMinutes(now, 15);

    events.forEach(event => {
      if (
        !this.notifiedEvents.has(event.id) &&
        isAfter(event.startTime, now) &&
        isBefore(event.startTime, soon)
      ) {
        this.showNotification(
          'Upcoming Event',
          `${event.title} starts in ${Math.round(
            (event.startTime.getTime() - now.getTime()) / 60000
          )} minutes`
        );
        this.notifiedEvents.add(event.id);
      }
    });
  }

  private checkUpcomingTasks(tasks: Task[]) {
    const now = new Date();
    const soon = addMinutes(now, 60);

    tasks.forEach(task => {
      if (
        !task.completed &&
        !this.notifiedTasks.has(task.id) &&
        isAfter(task.deadline, now) &&
        isBefore(task.deadline, soon)
      ) {
        this.showNotification(
          'Task Due Soon',
          `${task.title} is due in ${Math.round(
            (task.deadline.getTime() - now.getTime()) / 60000
          )} minutes`
        );
        this.notifiedTasks.add(task.id);
      }
    });
  }

  private showNotification(title: string, message: string) {
    // Show browser notification if permitted
    if (Notification.permission === 'granted') {
      new Notification(title, { body: message });
    }

    // Also show toast notification
    toast.info(message, {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }

  clearNotificationHistory() {
    this.notifiedEvents.clear();
    this.notifiedTasks.clear();
  }
}

export const notificationService = new NotificationService();