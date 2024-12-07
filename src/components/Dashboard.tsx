import React, { useState } from 'react';
import { Calendar } from './Calendar/Calendar';
import { TaskList } from './Tasks/TaskList';
import { NoteEditor } from './Notes/NoteEditor';
import { Task, Note } from '../types';
import { notificationService } from '../services/NotificationService';
import { useAutoCalendarSetup } from '../hooks/useAutoCalendarSetup';
import { useTaskManager } from '../hooks/useTaskManager';

export function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager();
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Auto-setup calendar when logged in
  useAutoCalendarSetup();

  React.useEffect(() => {
    notificationService.startMonitoring([], tasks);
    return () => notificationService.stopMonitoring();
  }, [tasks]);

  const handleAddEvent = () => {
    // This will be implemented when we add event creation functionality
    console.log('Add event clicked');
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
          <Calendar onAddEvent={handleAddEvent} />
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
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