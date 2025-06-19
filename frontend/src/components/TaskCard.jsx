import React, { useState } from 'react';
import { Edit2, Trash2, CheckCircle, Circle, AlertTriangle, Clock, Calendar } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskCard = ({ task, onEdit }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { toggleTaskStatus, deleteTask } = useTask();

  const handleToggleStatus = async () => {
    await toggleTaskStatus(task._id);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setIsDeleting(true);
      await deleteTask(task._id);
      setIsDeleting(false);
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-amber-600 bg-amber-100';
      case 'low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return Clock;
      case 'low':
        return Circle;
      default:
        return Circle;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const PriorityIcon = getPriorityIcon(task.priority);

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border transition-all duration-200 hover:shadow-md ${
      task.status === 'completed' ? 'border-green-200 bg-green-50/30' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between">
        {/* Task Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3 mb-3">
            <button
              onClick={handleToggleStatus}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                task.status === 'completed'
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-500'
              }`}
            >
              {task.status === 'completed' && <CheckCircle className="w-4 h-4" />}
            </button>

            <h3 className={`text-lg font-semibold ${
              task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>

            {/* Priority Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
              <PriorityIcon className="w-3 h-3 mr-1" />
              {task.priority}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <p className={`text-gray-600 mb-3 ${
              task.status === 'completed' ? 'line-through' : ''
            }`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Created {formatDate(task.createdAt)}</span>
            </div>
            {task.updatedAt !== task.createdAt && (
              <div className="flex items-center space-x-1">
                <span>Updated {formatDate(task.updatedAt)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit task"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;