import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './index.css';
// import TaskCard from './TaskCard';
import TaskListCard from './TaskListCard';

const containerStyles =
  "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";
const linkStyles = "text-teal-500 underline";

function UserPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`/tasks`);
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <TaskListCard tasks={tasks} />
        <div>
          <Link to={`/add-task`} className={linkStyles}>Add Task</Link>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

