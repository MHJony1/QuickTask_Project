"use client";
import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
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
      "To Do": "bg-gray-100 text-gray-700",
      "In Progress": "bg-yellow-100 text-yellow-700",
      Done: "bg-green-100 text-green-700",
    };
    return badges[status] || badges["To Do"];
  };

  return (
    <>
      <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h4 className="font-bold text-gray-900 mb-1 truncate">{task.title}</h4>
            {task.description && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {task.description}
              </p>
            )}

            {/* Status dropdown — this is what moves a task between columns */}
            <div className="flex items-center gap-2 mt-2">
              <select
                value={task.status}
                onChange={handleStatusChange}
                disabled={isUpdating}
                className={`text-xs px-3 py-1 rounded-full font-medium border-none outline-none cursor-pointer disabled:opacity-50 ${getStatusBadge(
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
                <Loader2 size={14} className="animate-spin text-gray-400" />
              )}
            </div>
          </div>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-gray-400 hover:text-red-500 transition-all p-1.5 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={18} />
          </button>
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