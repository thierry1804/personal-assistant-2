import React from 'react';
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Task } from '../../types';
import { formatDate } from '../../utils/dateUtils';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: () => void;
}

export function TaskList({ tasks, onToggleTask, onAddTask }: TaskListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold">Tasks</h2>
        </div>
        <button
          onClick={onAddTask}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          Add Task
        </button>
      </div>

      <div className="space-y-4">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No tasks yet</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center gap-4 p-4 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <button
                onClick={() => onToggleTask(task.id)}
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
          ))
        )}
      </div>
    </div>
  );
}