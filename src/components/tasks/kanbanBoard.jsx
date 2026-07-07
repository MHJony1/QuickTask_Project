'use client';
import React from "react";
import TaskColumn from "./TaskColumn";

const KanbanBoard = ({ tasks, onDeleteTask, onStatusChange }) => {
  const todoTasks = tasks?.filter((t) => t.status === "To Do") || [];
  const inProgressTasks = tasks?.filter((t) => t.status === "In Progress") || [];
  const doneTasks = tasks?.filter((t) => t.status === "Done") || [];

  const columns = [
    {
      title: "To Do",
      tasks: todoTasks,
      icon: "📋",
      color: "from-amber-50 to-orange-50",
      borderColor: "border-amber-200/50"
    },
    {
      title: "In Progress",
      tasks: inProgressTasks,
      icon: "🔄",
      color: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50"
    },
    {
      title: "Done",
      tasks: doneTasks,
      icon: "✅",
      color: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200/50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
      {columns.map((column) => (
        <TaskColumn
          key={column.title}
          title={column.title}
          icon={column.icon}
          tasks={column.tasks}
          color={column.color}
          borderColor={column.borderColor}
          onDeleteTask={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;