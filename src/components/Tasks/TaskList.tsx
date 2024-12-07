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

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-semibold">Tasks</h2>
        </div>
        <button
          onClick={() => setIsAddingTask(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {isAddingTask ? (
        <div className="mb-6">
          <TaskForm
            onSubmit={(task) => {
              onAddTask(task);
              setIsAddingTask(false);
            }}
            onCancel={() => setIsAddingTask(false)}
          />
        </div>
      ) : null}

      <div className="grid grid-cols-2 gap-4">
        {/* Urgent & Important */}
        <div className="space-y-2">
          <h3 className="font-medium text-red-600">Urgent & Important</h3>
          {tasksByQuadrant['urgent-important']?.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>

        {/* Not Urgent & Important */}
        <div className="space-y-2">
          <h3 className="font-medium text-blue-600">Not Urgent & Important</h3>
          {tasksByQuadrant['not-urgent-important']?.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>

        {/* Urgent & Not Important */}
        <div className="space-y-2">
          <h3 className="font-medium text-yellow-600">Urgent & Not Important</h3>
          {tasksByQuadrant['urgent-not-important']?.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>

        {/* Not Urgent & Not Important */}
        <div className="space-y-2">
          <h3 className="font-medium text-gray-600">Not Urgent & Not Important</h3>
          {tasksByQuadrant['not-urgent-not-important']?.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}