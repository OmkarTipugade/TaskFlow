import React from 'react';
import { useTask } from '../context/TaskContext';
import TaskCard from './TaskCard';
import LoadingSpinner from './LoadingSpinner';
import { CheckSquare } from 'lucide-react';

const TaskList = ({ onEditTask }) => {
  const { tasks, loading } = useTask();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <CheckSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No tasks yet</h3>
        <p className="text-gray-600 mb-6">
          Create your first task to get started organizing your workflow.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Your Tasks ({tasks.length})
        </h2>
      </div>
      
      <div className="grid gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;