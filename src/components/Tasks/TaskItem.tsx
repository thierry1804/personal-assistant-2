import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Task } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface TaskItemProps {
  task: Task;
  onToggle: (taskId: string) => void;
}

export function TaskItem({ task, onToggle }: TaskItemProps) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md hover:bg-gray-50">
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
      <div className="flex-1">
        <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.description && (
          <p className="text-sm text-gray-600">{task.description}</p>
        )}
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Clock className="w-4 h-4" />
        {formatDate(task.deadline)}
      </div>
    </div>
  );
}