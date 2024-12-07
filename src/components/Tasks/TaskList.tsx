import React, { useState } from 'react';
import { CheckCircle, Plus, Trash2 } from 'lucide-react';
import { Task } from '../../types';
import { TaskForm } from './TaskForm';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleTask, onAddTask, onDeleteTask }: TaskListProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);

  const activeTasks = tasks.filter(task => !task.completed);
  const tasksByQuadrant = activeTasks.reduce((acc, task) => {
    acc[task.quadrant] = [...(acc[task.quadrant] || []), task];
    return acc;
  }, {} as Record<Task['quadrant'], Task[]>);

  const quadrantColors = {
    'urgent-important': 'border-red-200 bg-red-50',
    'not-urgent-important': 'border-blue-200 bg-blue-50',
    'urgent-not-important': 'border-yellow-200 bg-yellow-50',
    'not-urgent-not-important': 'border-gray-200 bg-gray-50'
  };

  const quadrantTitles = {
    'urgent-important': { text: 'Do', color: 'text-red-700' },
    'not-urgent-important': { text: 'Plan', color: 'text-blue-700' },
    'urgent-not-important': { text: 'Delegate', color: 'text-yellow-700' },
    'not-urgent-not-important': { text: 'Eliminate', color: 'text-gray-700' }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <CheckCircle className="w-7 h-7 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Task Manager</h2>
        </div>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {isAddingTask && (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50">
          <TaskForm
            onSubmit={(task) => {
              onAddTask(task);
              setIsAddingTask(false);
            }}
            onCancel={() => setIsAddingTask(false)}
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(quadrantTitles).map(([quadrant, { text, color }]) => (
          <div
            key={quadrant}
            className={`p-4 rounded-lg border ${quadrantColors[quadrant as keyof typeof quadrantColors]}`}
          >
            <h3 className={`text-lg font-semibold mb-4 ${color}`}>
              {text}
            </h3>
            <div className="space-y-3">
              {tasksByQuadrant[quadrant as Task['quadrant']]?.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                />
              )) || (
                <p className="text-sm text-gray-500 text-center py-4">
                  No tasks in this category
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}