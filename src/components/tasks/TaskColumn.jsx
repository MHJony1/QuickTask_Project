'use client';
import React from "react";
import TaskCard from "./TaskCard";
import { Plus } from "lucide-react";

const TaskColumn = ({ title, icon, tasks, color, borderColor, onDeleteTask, onStatusChange }) => {
  return (
    <div className={`bg-gradient-to-br ${color} rounded-2xl border ${borderColor} p-4 sm:p-5 min-h-[350px] transition-all duration-300 hover:shadow-lg`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="font-bold text-gray-800 text-sm sm:text-base">{title}</h3>
        </div>
        <span className="bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-xs font-bold text-gray-500 shadow-sm border border-white/50">
          {tasks?.length || 0}
        </span>
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
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
          <div className="text-center py-12">
            <div className="w-12 h-12 bg-white/60 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus size={20} className="text-gray-300" />
            </div>
            <p className="text-sm text-gray-400 font-medium">No tasks here</p>
            <p className="text-xs text-gray-300 mt-1">Add a new task to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskColumn;