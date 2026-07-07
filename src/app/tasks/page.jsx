"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { taskApi } from "@/utils/api";
import toast from "react-hot-toast";
import {
  Loader2,
  ListTodo,
  Plus,
  Search,
  LayoutGrid,
  List,
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  Sparkles
} from "lucide-react";
import TaskCard from "@/components/tasks/TaskCard";
import Link from "next/link";

const TasksPage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState("list");

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

  const getTaskStats = () => {
    const total = tasks.length;
    const done = tasks.filter(t => t.status === "Done").length;
    const inProgress = tasks.filter(t => t.status === "In Progress").length;
    const todo = tasks.filter(t => t.status === "To Do").length;
    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;
    return { total, done, inProgress, todo, completionRate };
  };

  const stats = getTaskStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50/60 via-white to-indigo-50/40">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-100 rounded-full animate-spin border-t-blue-600" />
            <Sparkles size={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" />
          </div>
          <p className="text-gray-500 text-sm mt-3 font-medium">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const filters = ["All", "To Do", "In Progress", "Done"];

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "All" ? true : task.status === filter;
    const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "Done": return <CheckCircle2 size={16} className="text-emerald-500" />;
      case "In Progress": return <Clock size={16} className="text-blue-500" />;
      case "To Do": return <AlertCircle size={16} className="text-amber-500" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Done": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "In Progress": return "bg-blue-50 text-blue-700 border-blue-200";
      case "To Do": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl shadow-lg shadow-blue-200/50">
                <ListTodo size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-gray-900">
                  My Tasks
                </h1>
                <p className="text-sm text-gray-500">
                  {stats.total} task{stats.total !== 1 ? 's' : ''} · {stats.done} completed · {stats.completionRate}% done
                </p>
              </div>
            </div>
          </div>

          <Link
            href="/dashboard"
            className="group w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm"
          >
            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            <span>New Task</span>
          </Link>
        </div>

        {/* Stats Cards - Premium Design */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            {
              label: "Total",
              value: stats.total,
              gradient: "from-blue-500 to-indigo-500",
              bg: "from-blue-50 to-indigo-50",
              icon: ListTodo,
              border: "border-blue-100"
            },
            {
              label: "To Do",
              value: stats.todo,
              gradient: "from-amber-500 to-orange-500",
              bg: "from-amber-50 to-orange-50",
              icon: AlertCircle,
              border: "border-amber-100"
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              gradient: "from-blue-500 to-cyan-500",
              bg: "from-blue-50 to-cyan-50",
              icon: Clock,
              border: "border-blue-100"
            },
            {
              label: "Done",
              value: stats.done,
              gradient: "from-emerald-500 to-green-500",
              bg: "from-emerald-50 to-green-50",
              icon: CheckCircle2,
              border: "border-emerald-100"
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`relative bg-white rounded-2xl border ${stat.border} p-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 overflow-hidden group`}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${stat.gradient} opacity-5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 font-medium mt-0.5">{stat.label}</p>
                </div>
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center shadow-md`}>
                  <stat.icon size={18} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filter and Search Bar - Premium */}
        <div className="bg-white rounded-2xl border border-gray-100/80 p-4 shadow-sm hover:shadow-md transition-shadow duration-300 mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder:text-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="flex gap-2">
              {/* Status filters */}
              <div className="flex gap-1 bg-gray-100/80 p-1 rounded-xl">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${filter === f
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700 hover:bg-white/50"
                      }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* View mode toggle */}
              <div className="flex gap-1 bg-gray-100/80 p-1 rounded-xl">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "list"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <List size={16} />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${viewMode === "grid"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-400 hover:text-gray-600"
                    }`}
                >
                  <LayoutGrid size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Content */}
        {isLoadingTasks ? (
          <div className="flex justify-center py-16">
            <div className="text-center">
              <Loader2 size={36} className="animate-spin text-blue-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Loading tasks...</p>
            </div>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
              {searchQuery ? (
                <Search size={32} className="text-blue-400" />
              ) : (
                <ListTodo size={32} className="text-blue-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">
              {searchQuery ? "No matching tasks found" : `No tasks ${filter !== "All" ? `in "${filter}"` : "yet"}`}
            </h3>
            <p className="text-gray-400 text-sm mb-4 max-w-sm mx-auto">
              {searchQuery
                ? `Try adjusting your search query or clear the search`
                : filter !== "All"
                  ? `Try changing the filter or create a new task`
                  : "Create your first task and start being productive!"}
            </p>
            {(filter !== "All" || searchQuery) && (
              <button
                onClick={() => {
                  setFilter("All");
                  setSearchQuery("");
                }}
                className="text-blue-600 text-sm font-medium hover:text-blue-700 inline-flex items-center gap-1"
              >
                Clear all filters →
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Results count */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                Showing <span className="font-semibold text-gray-700">{filteredTasks.length}</span> task{filteredTasks.length !== 1 ? 's' : ''}
                {filter !== "All" && ` in "${filter}"`}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>

            <div className={viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-3"
            }>
              {filteredTasks.map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TasksPage;