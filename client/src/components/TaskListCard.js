import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

const containerStyles = "max-w-lg mx-auto mt-14 h-[84vh] flex flex-col";

const cardStyles =
  "bg-white rounded-lg shadow-md p-4 flex-grow overflow-y-auto";
const headingStyles = "text-2xl font-bold mb-4";
const labelStyles = "block mt-4";
const selectStyles = "w-full border-2 border-gray-300 rounded-md mb-4 p-2";
const separatorStyles = "border-b border-gray-300 my-4";
const addButtonStyles =
  "absolute top-20 right-5 bg-white text-black rounded-lg p-2 shadow-lg hover:shadow-2xl hover:bg-black hover:text-white flex items-center justify-center space-x-2 font-medium animate-pulse";

function TaskListCard() {
  const [tasks, setTasks] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const update = (task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const deleteTask = (task) => setTasks(tasks.filter((t) => t.id !== task.id));

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortTasks = (option) => {
    let sortedTasks = [];

    if (option === "due_date_asc") {
      sortedTasks = tasks.sort(
        (a, b) => new Date(a.due_date) - new Date(b.due_date)
      );
    } else if (option === "due_date_desc") {
      sortedTasks = tasks.sort(
        (a, b) => new Date(b.due_date) - new Date(a.due_date)
      );
    } else if (option === "date_created_asc") {
      sortedTasks = tasks.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else if (option === "date_created_desc") {
      sortedTasks = tasks.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (option === "priority") {
      sortedTasks = tasks.sort((a, b) => {
        const priorityA = a.high_priority !== null ? a.high_priority : false;
        const priorityB = b.high_priority !== null ? b.high_priority : false;
        if (priorityA && !priorityB) {
          return -1;
        } else if (!priorityA && priorityB) {
          return 1;
        } else {
          // If both tasks have the same priority or if both have null priority,
          // sort them based on their IDs in ascending order
          return a.id - b.id;
        }
      });
    }

    return sortedTasks;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/tasks");
        const data = await response.json();
        console.log(data);
        const updatedTasks = data.tasks.map((task) => ({
          ...task,
          high_priority:
            task.high_priority !== null ? task.high_priority : false,
        }));
        console.log("updating tasks");
        setTasks(updatedTasks);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const sortedTasks = sortOption ? sortTasks(sortOption) : tasks;

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <h3 className={headingStyles}>Tasks:</h3>
        <div className="flex flex-col">
          <label htmlFor="sortOption" className={labelStyles}>
            Sort by:
          </label>
          <select
            id="sortOption"
            value={sortOption}
            onChange={handleSortChange}
            className={selectStyles}
          >
            <option value="">-- Select an option --</option>
            <option value="due_date_asc">Due Date (Old to New)</option>
            <option value="due_date_desc">Due Date (New to Old)</option>
            <option value="date_created_asc">Date Created (Old to New)</option>
            <option value="date_created_desc">Date Created (New to Old)</option>
            <option value="priority">Priority</option>
          </select>
        </div>
        {sortedTasks.map((task, index) => (
          <React.Fragment key={task.id}>
            <TaskCard task={task} deleteT={deleteTask} update={update} />
            {index !== sortedTasks.length - 1 && (
              <hr className={separatorStyles} />
            )}
          </React.Fragment>
        ))}
      </div>
      <Link to="/add-task" className={addButtonStyles}>
        <FaPlus size={24} />
        <span>Add Task</span>
      </Link>
    </div>
  );
}

export default TaskListCard;
