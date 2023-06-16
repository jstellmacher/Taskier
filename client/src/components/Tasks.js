import React, { useEffect, useState } from 'react';
import TaskCard from './TaskCard';

function Tasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

export default Tasks;
