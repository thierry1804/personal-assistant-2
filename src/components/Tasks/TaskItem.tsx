import React from 'react';
import { CheckCircle, Circle, Clock, Trash2 } from 'lucide-react';
import { Task } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-md hover:bg-gray-50">
      <button
        onClick={() => onToggle(task.id)}
        className="flex-shrink-0"
      >
        {task.completed ? (
          <CheckCircle className="w-5 h-5 text-green-600" />
        ) : (
          <Circle className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <div className="flex-1 min-w-0">
        <h4 className={`font-medium truncate ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h4>
        {task.description && (
          <p className="text-sm text-gray-600 truncate">{task.description}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3" />
          {formatDate(task.deadline)}
        </div>
      </div>
      <button
        onClick={() => onDelete(task.id)}
        className="p-1 text-gray-400 hover:text-red-600"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}