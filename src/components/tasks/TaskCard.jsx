'use client';
import React, { useState } from "react";
import { Trash2, Loader2, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import ConfirmModal from "@/components/shared/ConfirmModal";

const STATUSES = ["To Do", "In Progress", "Done"];

const TaskCard = ({ task, onDelete, onStatusChange }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleConfirmDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(task._id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;
    if (newStatus === task.status) return;

    setIsUpdating(true);
    try {
      await onStatusChange(task._id, newStatus);
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      "To Do": "bg-amber-100 text-amber-700 border-amber-200",
      "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
      "Done": "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
    return badges[status] || badges["To Do"];
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "To Do": return <AlertCircle size={12} className="text-amber-500" />;
      case "In Progress": return <Clock size={12} className="text-blue-500" />;
      case "Done": return <CheckCircle2 size={12} className="text-emerald-500" />;
      default: return null;
    }
  };

  return (
    <>
      <div className="group bg-white rounded-xl border border-gray-100/80 p-4 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all duration-300 hover:-translate-y-0.5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2">
              <div className="mt-0.5">
                {getStatusIcon(task.status)}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 text-sm mb-1 leading-tight">
                  {task.title}
                </h4>
                {task.description && (
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2 leading-relaxed">
                    {task.description}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <select
                    value={task.status}
                    onChange={handleStatusChange}
                    disabled={isUpdating}
                    className={`text-xs px-2.5 py-1 rounded-lg font-medium border outline-none cursor-pointer disabled:opacity-50 transition-all hover:shadow-sm ${getStatusBadge(
                      task.status
                    )}`}
                  >
                    {STATUSES.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  {isUpdating && (
                    <Loader2 size={12} className="animate-spin text-gray-400" />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100/60 flex items-center justify-between">
          <span className="text-[10px] text-gray-400 font-medium">
            Created: {new Date(task.createdAt).toLocaleDateString()}
          </span>
          <span className="text-[10px] text-gray-400">
            #{task._id?.slice(-6)}
          </span>
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete this task?"
        message={`"${task.title}" will be permanently removed. This action cannot be undone.`}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        danger
        isLoading={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  );
};

export default TaskCard;