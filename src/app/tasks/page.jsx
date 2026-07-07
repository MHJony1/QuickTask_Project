"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { taskApi } from "@/utils/api";
import toast from "react-hot-toast";
import { Loader2, ListTodo } from "lucide-react";
import TaskCard from "@/components/tasks/TaskCard";

const TasksPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [filter, setFilter] = useState("All"); 

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
        router.push("/login");
      }
    } catch (error) {
      console.error("Auth error:", error);
      router.push("/login");
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
      console.error("Fetch tasks error:", error);
      toast.error("Failed to load tasks");
      setTasks([]);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!confirm("Delete this task?")) return;

    try {
      await taskApi.delete(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("Task deleted");
    } catch (error) {
      toast.error(error.message || "Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      const updated = await taskApi.update(taskId, { status: newStatus });
      setTasks((prev) =>
        prev.map((task) => (task._id === taskId ? updated : task))
      );
    } catch (error) {
      toast.error(error.message || "Failed to update task status");
      throw error;
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

  const filters = ["All", "To Do", "In Progress", "Done"];
  const visibleTasks =
    filter === "All" ? tasks : tasks.filter((t) => t.status === filter);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ListTodo className="text-blue-600" size={24} />
            All Tasks
          </h2>
          <p className="text-gray-500 text-sm mt-0.5">
            Every task you&apos;ve created, in one place.
          </p>
        </div>

        {/* Status filter tabs */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                filter === f
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {isLoadingTasks ? (
        <div className="flex justify-center py-12">
          <Loader2 size={32} className="animate-spin text-blue-500" />
        </div>
      ) : visibleTasks.length === 0 ? (
        <div className="text-center text-gray-400 text-sm py-16 bg-gray-50 rounded-2xl border border-gray-100">
          No tasks {filter !== "All" ? `in "${filter}"` : "yet"}.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visibleTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksPage;