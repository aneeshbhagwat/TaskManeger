// TaskList.js
import React from "react";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, assignTaskToCategory }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`${styles.task} ${styles[task.priority.toLowerCase()]}`}
        >
          <span>{task.name}</span>
          <span>{task.description}</span>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
