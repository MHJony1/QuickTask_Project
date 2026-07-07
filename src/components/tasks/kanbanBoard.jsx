"use client";
import React from "react";
import TaskColumn from "./TaskColumn";

const KanbanBoard = ({ tasks, onDeleteTask, onStatusChange }) => {
  const todoTasks = tasks?.filter((t) => t.status === "To Do") || [];
  const inProgressTasks = tasks?.filter((t) => t.status === "In Progress") || [];
  const doneTasks = tasks?.filter((t) => t.status === "Done") || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <TaskColumn
        title="📋 To Do"
        tasks={todoTasks}
        onDeleteTask={onDeleteTask}
        onStatusChange={onStatusChange}
      />
      <TaskColumn
        title="🔄 In Progress"
        tasks={inProgressTasks}
        onDeleteTask={onDeleteTask}
        onStatusChange={onStatusChange}
      />
      <TaskColumn
        title="✅ Done"
        tasks={doneTasks}
        onDeleteTask={onDeleteTask}
        onStatusChange={onStatusChange}
      />
    </div>
  );
};

export default KanbanBoard;