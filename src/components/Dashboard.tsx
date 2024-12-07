import React, { useState } from 'react';
import { Calendar } from './Calendar/Calendar';
import { TaskList } from './Tasks/TaskList';
import { NoteEditor } from './Notes/NoteEditor';
import { NoteList } from './Notes/NoteList';
import { Task } from '../types';
import { notificationService } from '../services/NotificationService';
import { useAutoCalendarSetup } from '../hooks/useAutoCalendarSetup';
import { useTaskManager } from '../hooks/useTaskManager';
import { useNoteManager } from '../hooks/useNoteManager';

export function Dashboard() {
  const { tasks, addTask, toggleTask, deleteTask } = useTaskManager();
  const { notes, addNote, deleteNote } = useNoteManager();
  const [isAddingNote, setIsAddingNote] = useState(false);

  // Auto-setup calendar when logged in
  useAutoCalendarSetup();

  React.useEffect(() => {
    notificationService.startMonitoring([], tasks);
    return () => notificationService.stopMonitoring();
  }, [tasks]);

  const handleAddEvent = () => {
    console.log('Add event clicked');
  };

  const handleSaveNote = (title: string, content: string) => {
    addNote(title, content);
    setIsAddingNote(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar Section */}
        <div className="lg:col-span-2">
          <Calendar onAddEvent={handleAddEvent} />
        </div>

        {/* Notes Section */}
        <div className="space-y-6">
          {isAddingNote ? (
            <NoteEditor
              onSave={handleSaveNote}
              onClose={() => setIsAddingNote(false)}
            />
          ) : (
            <NoteList
              notes={notes}
              onAddNote={() => setIsAddingNote(true)}
              onDeleteNote={deleteNote}
            />
          )}
        </div>

        {/* Tasks Section - Full Width */}
        <div className="lg:col-span-3">
          <TaskList
            tasks={tasks}
            onToggleTask={toggleTask}
            onAddTask={addTask}
            onDeleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
}