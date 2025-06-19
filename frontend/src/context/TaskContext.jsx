import React, { createContext, useContext, useState, useEffect } from 'react';
import { taskAPI } from '../services/api';
import { useAuth } from './AuthContext';

const TaskContext = createContext();

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    sort: 'createdAt',
    order: 'desc'
  });

  const { isAuthenticated } = useAuth();

  // Fetch tasks when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    } else {
      setTasks([]);
    }
  }, [isAuthenticated, filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await taskAPI.getTasks(filters);
      
      if (response.success) {
        setTasks(response.tasks);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Fetch tasks error:', error);
      setError(error.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    try {
      setError(null);
      
      const response = await taskAPI.createTask(taskData);
      
      if (response.success) {
        setTasks(prev => [response.task, ...prev]);
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to create task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      setError(null);
      
      const response = await taskAPI.updateTask(taskId, taskData);
      
      if (response.success) {
        setTasks(prev => prev.map(task => 
          task._id === taskId ? response.task : task
        ));
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to update task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const deleteTask = async (taskId) => {
    try {
      setError(null);
      
      const response = await taskAPI.deleteTask(taskId);
      
      if (response.success) {
        setTasks(prev => prev.filter(task => task._id !== taskId));
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to delete task';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const toggleTaskStatus = async (taskId) => {
    try {
      setError(null);
      
      const response = await taskAPI.toggleTaskStatus(taskId);
      
      if (response.success) {
        setTasks(prev => prev.map(task => 
          task._id === taskId ? response.task : task
        ));
        return { success: true };
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to toggle task status';
      setError(errorMessage);
      return { success: false, message: errorMessage };
    }
  };

  const clearError = () => {
    setError(null);
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'completed').length,
    incomplete: tasks.filter(task => task.status === 'incomplete').length,
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length
  };

  const value = {
    tasks,
    loading,
    error,
    filters,
    stats,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    updateFilters,
    clearError,
    refreshTasks: fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};