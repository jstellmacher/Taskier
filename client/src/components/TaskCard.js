import React from "react";
import { FaTrash, FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function TaskCard({ task, update, deleteT, highPriority }) {
  const handleStatusUpdate = async () => {
    const updatedTask = { ...task, status: "completed" };
    delete updatedTask["created_at"];
    try {
      const response = await fetch(`/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        console.log("Task status updated successfully");
        response.json().then((t) => update({ ...t, status: "completed" }));
      } else {
        console.log("Failed to update task status");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteTask = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteT(task);
    }
  };

  const handleEditTask = () => {
    update({ ...task, isEditing: true });
  };

  const handleUpdateTask = async () => {
    const updatedTask = { ...task };
    delete updatedTask["created_at"];
    try {
      const response = await fetch(`/tasks/${task.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (response.ok) {
        console.log("Task updated successfully");
        response.json().then((t) => update(t));
      } else {
        console.log("Failed to update task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelEdit = () => {
    update({ ...task, isEditing: false });
  };

  if (!task) {
    return null;
  }

  return (
    <div className="bg-green-100 rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between">
        {task.high_priority && (
          <div className="bg-red-500 text-white rounded-full px-2 py-1">
            High
          </div>
        )}
        <div className="-mr-4">
          <h2 className="text-xl font-semibold">Title: {task.title}</h2>
          <h3 className="text-gray-600">Due Date: {task.due_date}</h3>
          <div className="mt-2">
            <p className="text-gray-800">{task.description}</p>
          </div>
        </div>

        {!task.isCompleted ? (
          <div className="flex items-center">
            {!task.isEditing ? (
              <button
                className="text-green-500 mr-2"
                onClick={handleStatusUpdate}
              >
                <FaCheck size={20} />
              </button>
            ) : (
              <div>
                <h2 className="text-xl font-semibold">Edit Task</h2>
                <input
                  className="border rounded px-2 py-1 mt-2"
                  type="text"
                  value={task.title}
                  onChange={(e) => update({ ...task, title: e.target.value })}
                  placeholder="Title"
                />
                <input
                  className="border rounded px-2 py-1 mt-2"
                  type="date"
                  value={task.due_date}
                  onChange={(e) =>
                    update({ ...task, due_date: e.target.value })
                  }
                  placeholder="Due Date"
                />
                <textarea
                  className="border rounded px-2 py-1 mt-2"
                  rows={3}
                  value={task.description}
                  onChange={(e) =>
                    update({ ...task, description: e.target.value })
                  }
                  placeholder="Description"
                />
                <div className="mt-2">
                  <button
                    className="bg-green-500 text-white rounded px-4 py-2 mr-2"
                    onClick={handleUpdateTask}
                  >
                    Save
                  </button>
                  <FaTimes
                    size={20}
                    onClick={handleCancelEdit}
                    className="text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            )}
            <FaEdit
              size={20}
              onClick={handleEditTask}
              className="text-blue-500 cursor-pointer ml-2"
            />
          </div>
        ) : (
          <div>
            <p className="text-green-500 font-semibold">Task Completed!</p>
            <div className="mt-2">
              <FaTrash
                size={20}
                onClick={handleDeleteTask}
                className="text-red-500 cursor-pointer"
              />
              <FaTimes
                size={20}
                onClick={handleCancelEdit}
                className="text-red-500 cursor-pointer ml-2"
              />
            </div>
          </div>
        )}
        <Link to={`/tasks/${task.id}`}>
          <button className="bg-blue-500 text-white rounded px-4 py-2 mt-2">
            Go to Task
          </button>
        </Link>
      </div>
    </div>
  );
}

export default TaskCard;
