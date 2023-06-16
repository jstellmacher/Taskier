import React, { useState } from "react";

function TaskCard({ hour }) {
  const [task, setTask] = useState("");

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement task submission logic, e.g., store the task in an array or send it to a server
    console.log(`Task for ${hour}: ${task}`);
    setTask("");
  };

  return (
    <div className="task-card">
      <h3>{hour}</h3>
      <form onSubmit={handleTaskSubmit}>
        <input
          type="text"
          value={task}
          onChange={handleTaskChange}
          placeholder="Enter task"
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

function TodoList() {
  const hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return (
    <div>
      <h1>Todo List</h1>
      <div className="task-cards">
        {hours.map((hour) => (
          <TaskCard key={hour} hour={hour} />
        ))}
      </div>
    </div>
  );
}

export default TodoList;
