export interface Task {
  id: string;
  title: string;
  description?: string;
  deadline: Date;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  extractedTasks: Task[];
  extractedEvents: Event[];
}

export interface GoogleCalendarConfig {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}