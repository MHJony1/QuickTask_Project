'use client';
import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const AddTaskForm = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error('Please enter a task title');
      return;
    }

    setLoading(true);

    try {
      const newTask = {
        title: title.trim(),
        description: description.trim(),
        status: 'To Do',
      };

      // Parent component handles the API call
      await onTaskAdded(newTask);

      setTitle('');
      setDescription('');
    } catch (error) {
      // Error already handled in parent
      console.error('Error adding task:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm mb-10">
      <h2 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
        Create New Task
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400 font-medium"
            required
            disabled={loading}
          />
        </div>

        <div className="flex-[2]">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a short description..."
            className="w-full px-5 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-gray-400"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-gray-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 min-w-[140px]"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Adding...
            </>
          ) : (
            <>
              <Plus size={20} /> Add Task
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTaskForm;
