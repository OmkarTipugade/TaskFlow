import React, { useState, useEffect } from 'react';
import { X, Plus, Edit3, AlertTriangle, Clock, Circle } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import LoadingSpinner from './LoadingSpinner';
import ErrorAlert from './ErrorAlert';

const TaskForm = ({ task, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createTask, updateTask, error, clearError } = useTask();

  const isEditing = !!task;

  // Initialize form data when task changes
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium'
      });
    }
    clearError();
    setFormErrors({});
  }, [task, clearError]);

  const validateForm = () => {
    const errors = {};
    
    if (!formData.title.trim()) {
      errors.title = 'Task title is required';
    } else if (formData.title.trim().length > 100) {
      errors.title = 'Title cannot exceed 100 characters';
    }
    
    if (formData.description && formData.description.length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    const taskData = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority
    };

    let result;
    
    if (isEditing) {
      result = await updateTask(task._id, taskData);
    } else {
      result = await createTask(taskData);
    }
    
    setIsSubmitting(false);
    
    if (result.success) {
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear field error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
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

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 border-red-200 bg-red-50';
      case 'medium':
        return 'text-amber-600 border-amber-200 bg-amber-50';
      case 'low':
        return 'text-green-600 border-green-200 bg-green-50';
      default:
        return 'text-gray-600 border-gray-200 bg-gray-50';
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {isEditing ? (
              <Edit3 className="w-6 h-6 text-blue-600" />
            ) : (
              <Plus className="w-6 h-6 text-blue-600" />
            )}
            <h2 className="text-xl font-semibold text-gray-900">
              {isEditing ? 'Edit Task' : 'Create New Task'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <ErrorAlert message={error} onClose={clearError} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Task Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  formErrors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter task title..."
                maxLength="100"
              />
              <div className="flex items-center justify-between mt-1">
                {formErrors.title && (
                  <p className="text-sm text-red-600">{formErrors.title}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.title.length}/100
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                  formErrors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter task description..."
                maxLength="500"
              />
              <div className="flex items-center justify-between mt-1">
                {formErrors.description && (
                  <p className="text-sm text-red-600">{formErrors.description}</p>
                )}
                <p className="text-xs text-gray-500 ml-auto">
                  {formData.description.length}/500
                </p>
              </div>
            </div>

            {/* Priority */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Priority Level
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['low', 'medium', 'high'].map((priority) => {
                  const Icon = getPriorityIcon(priority);
                  const isSelected = formData.priority === priority;
                  
                  return (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, priority }))}
                      className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                        isSelected
                          ? `${getPriorityColor(priority)} border-opacity-100`
                          : 'border-gray-200 bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex flex-col items-center space-y-2">
                        <Icon className={`w-5 h-5 ${
                          isSelected 
                            ? priority === 'high' ? 'text-red-600' : priority === 'medium' ? 'text-amber-600' : 'text-green-600'
                            : 'text-gray-400'
                        }`} />
                        <span className={`text-sm font-medium capitalize ${
                          isSelected 
                            ? priority === 'high' ? 'text-red-700' : priority === 'medium' ? 'text-amber-700' : 'text-green-700'
                            : 'text-gray-600'
                        }`}>
                          {priority}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting && <LoadingSpinner size="small" />}
                <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;