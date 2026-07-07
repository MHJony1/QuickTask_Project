"use client";
import React from "react";
import TaskCard from "./TaskCard";

const TaskColumn = ({ title, tasks, onDeleteTask, onStatusChange }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 min-h-[400px]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-gray-700 text-lg">{title}</h3>
        <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-400 border">
          {tasks?.length || 0}
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {tasks?.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={onDeleteTask}
              onStatusChange={onStatusChange}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 text-sm py-8">
            No tasks here
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;