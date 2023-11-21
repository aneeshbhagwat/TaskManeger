// TaskForm.js
import React, { useState } from "react";
const TaskForm = ({ onSubmit, categories, taskNameInputRef }) => {
  const [task, setTask] = useState({
    name: "",
    description: "",
    priority: "None",
  });

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...task, id: Date.now() });
    setTask({
      name: "",
      description: "",
      priority: "Low",
    });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Task Name:
          <input
            type="text"
            name="name"
            value={task.name}
            onChange={handleChange}
            ref={taskNameInputRef}
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Priority:
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </label>

        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
