'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { taskApi, paymentApi } from '@/utils/api';
import toast from 'react-hot-toast';
import { Crown, Unlock, Loader2 } from 'lucide-react';
import AddTaskForm from '@/components/tasks/AddTaskForm';
import KanbanBoard from '@/components/tasks/kanbanBoard';

const DashboardPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      setLoading(true);
      const { data } = await authClient.getSession();

      if (data?.user) {
        setUser(data.user);
        await fetchTasks();
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth error:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      setIsLoadingTasks(true);
      const data = await taskApi.getAll();
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Fetch tasks error:', error);
      toast.error('Failed to load tasks');
      setTasks([]);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleAddTask = async (newTaskData) => {
    try {
      const created = await taskApi.create(newTaskData);
      setTasks((prev) => [created, ...prev]);
      toast.success('Task created successfully!');
    } catch (error) {
      if (error.status === 403 || error.code === 'TASK_LIMIT_REACHED') {
        toast.error('Free users can only have 3 tasks! Upgrade to premium.');
      } else {
        toast.error(error.message || 'Failed to create task');
      }
      throw error;
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm('Delete this task?')) return;

    try {
      await taskApi.delete(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error(error.message || 'Failed to delete task');
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updated = await taskApi.update(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updated : task)),
      );
    } catch (error) {
      toast.error(error.message || 'Failed to update task status');
      throw error;
    }
  };

  const handleUpgrade = async () => {
    if (isUpgrading) return;
    setIsUpgrading(true);
    try {
      const data = await paymentApi.createCheckoutSession();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      toast.error(error.message || 'Failed to start upgrade');
      setIsUpgrading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 size={40} className="animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) return null;

  const isPremium = user?.isPremium === true;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            Welcome back, {user?.name}!
            {isPremium && (
              <span className="bg-yellow-400 text-yellow-900 text-xs px-2.5 py-1 rounded-full font-bold flex items-center gap-1">
                <Crown size={14} /> Premium
              </span>
            )}
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            {isPremium
              ? '🎉 Unlimited tasks available'
              : `📝 ${tasks?.length || 0} / 3 tasks used`}
          </p>
        </div>

        {!isPremium && (
          <button
            onClick={handleUpgrade}
            disabled={isUpgrading}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isUpgrading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Unlock size={16} />
            )}
            Unlock Unlimited Tasks ($5)
          </button>
        )}
      </div>

      <AddTaskForm onTaskAdded={handleAddTask} />

      {isLoadingTasks ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      ) : (
        <KanbanBoard
          tasks={tasks}
          onDeleteTask={handleDeleteTask}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
};

export default DashboardPage;
