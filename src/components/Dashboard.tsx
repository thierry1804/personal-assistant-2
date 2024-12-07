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
    // This will be implemented when we add event creation functionality
    console.log('Add event clicked');
  };

  const handleSaveNote = (title: string, content: string) => {
    addNote(title, content);
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
        <div className="space-y-8">
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
      </div>
    </div>
  );
}