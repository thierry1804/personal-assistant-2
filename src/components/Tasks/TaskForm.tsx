import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Task } from '../../types';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onCancel: () => void;
}

export function TaskForm({ onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState(new Date());
  const [isUrgent, setIsUrgent] = useState(false);
  const [isImportant, setIsImportant] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quadrant = isUrgent && isImportant
      ? 'urgent-important'
      : isUrgent && !isImportant
      ? 'urgent-not-important'
      : !isUrgent && isImportant
      ? 'not-urgent-important'
      : 'not-urgent-not-important';

    onSubmit({
      title,
      description,
      deadline,
      completed: false,
      priority: isImportant ? 'high' : isUrgent ? 'medium' : 'low',
      quadrant,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="urgent"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="rounded text-blue-600"
          />
          <label htmlFor="urgent">Urgent</label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="important"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
            className="rounded text-blue-600"
          />
          <label htmlFor="important">Important</label>
        </div>
      </div>

      <div className="flex gap-4">
        <input
          type="datetime-local"
          value={deadline.toISOString().slice(0, 16)}
          onChange={(e) => setDeadline(new Date(e.target.value))}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}