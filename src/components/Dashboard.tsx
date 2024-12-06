import React, { useState } from 'react';
import { Calendar } from './Calendar/Calendar';
import { TaskList } from './Tasks/TaskList';
import { NoteEditor } from './Notes/NoteEditor';
import { Event, Task, Note } from '../types';
import { notificationService } from '../services/NotificationService';

export function Dashboard() {
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);

  React.useEffect(() => {
    notificationService.startMonitoring(events, tasks);
    return () => notificationService.stopMonitoring();
  }, [events, tasks]);

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: Date.now().toString(),
      title: 'New Event',
      startTime: new Date(),
      endTime: new Date(Date.now() + 3600000),
    };
    setEvents([...events, newEvent]);
  };

  const handleAddTask = () => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: 'New Task',
      deadline: new Date(Date.now() + 86400000),
      completed: false,
      priority: 'medium',
    };
    setTasks([...tasks, newTask]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSaveNote = (title: string, content: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
      extractedTasks: [],
      extractedEvents: [],
    };
    setNotes([...notes, newNote]);
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Calendar events={events} onAddEvent={handleAddEvent} />
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
          />
        </div>
        <div>
          {isAddingNote ? (
            <NoteEditor
              onSave={handleSaveNote}
              onClose={() => setIsAddingNote(false)}
            />
          ) : (
            <button
              onClick={() => setIsAddingNote(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors"
            >
              Add a new note
            </button>
          )}
        </div>
      </div>
    </div>
  );
}