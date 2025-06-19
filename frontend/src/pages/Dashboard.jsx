import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskStats from '../components/TaskStats';
import TaskFilters from '../components/TaskFilters';
import DashboardHeader from '../components/DashboardHeader';
import ErrorAlert from '../components/ErrorAlert';

const Dashboard = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  const { user } = useAuth();
  const { error, clearError } = useTask();

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleCloseForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <DashboardHeader onCreateTask={() => setShowTaskForm(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600">
            Here's an overview of your tasks and productivity.
          </p>
        </div>

        {/* Error Alert */}
        <ErrorAlert message={error} onClose={clearError} />

        {/* Stats */}
        <TaskStats />

        {/* Filters */}
        <TaskFilters />

        {/* Tasks */}
        <TaskList onEditTask={handleEditTask} />

        {/* Task Form Modal */}
        {showTaskForm && (
          <TaskForm
            task={editingTask}
            onClose={handleCloseForm}
          />
        )}
      </main>
    </div>
  );
};

export default Dashboard;