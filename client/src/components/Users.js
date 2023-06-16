import React, { useEffect, useState } from 'react';

const containerStyles = "bg-gradient-to-r from-green-900 to-teal-200 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8";
const cardStyles = "max-w-md w-full p-6 bg-white rounded-lg shadow-2xl";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const renderTasks = (tasks) => {
    // Sort tasks by created_at in ascending order
    const sortedTasks = tasks.sort((a, b) => {
      return new Date(a.created_at) - new Date(b.created_at);
    });

    return sortedTasks.map((task) => (
      <div key={task.id}>
        <h3>{task.title}</h3>
        <p>Description: {task.description}</p>
        <p>Status: {task.status}</p>
      </div>
    ));
  };

  return (
    <div className={containerStyles}>
      <div className={cardStyles}>
        <h1>Users</h1>
        {users.map((user) => (
          <div key={user.id}>
            <h3>{user.username}</h3>
            <p>Email: {user.email}</p>
            <h4>Tasks:</h4>
            {renderTasks(user.tasks)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
